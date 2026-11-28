// 架构约束（见 docs/architecture.md）：按源码里的 import 语句建依赖图，检查循环依赖和跨层导入
// 只看静态的相对导入和裸包名，不执行模块
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, normalize, relative } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const rel = p => relative(ROOT, p).replace(/\\/g, '/')
function walk(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory())
      walk(p, out)
    else if (/\.(?:m?js|vue)$/.test(e.name))
      out.push(rel(p))
  }
  return out
}
const IMPORT = /(?:^|[\s;])(?:import|export)\s[^'"`;]*?from\s*['"]([^'"]+)['"]|(?:^|[\s;])import\s*\(?\s*['"]([^'"]+)['"]/g
function importsOf(file) {
  const src = readFileSync(join(ROOT, file), 'utf8')
  return [...src.matchAll(IMPORT)].map(m => m[1] ?? m[2])
}

const srcFiles = walk(join(ROOT, 'src'))
const known = new Set(srcFiles)
// 相对导入解析成仓库内路径（Vite 习惯省略 .js）；裸包名原样返回，带 'pkg:' 前缀
function resolve(from, spec) {
  if (!spec.startsWith('.'))
    return `pkg:${spec.split('/').slice(0, spec.startsWith('@') ? 2 : 1).join('/')}`
  const p = normalize(join(dirname(from), spec)).replace(/\\/g, '/')
  return [p, `${p}.js`].find(c => known.has(c)) ?? p
}
const graph = new Map(srcFiles.map(f => [f, [...new Set(importsOf(f).map(s => resolve(f, s)))]]))
const isIcon = f => f.startsWith('src/icons/')

// 从入口出发能到达的全部模块（含入口）
function closure(entries) {
  const seen = new Set()
  const stack = [...entries]
  while (stack.length) {
    const f = stack.pop()
    if (seen.has(f))
      continue
    seen.add(f)
    stack.push(...(graph.get(f) ?? []))
  }
  return seen
}

// 站点专用的模块：发布包里的任何模块都不能用到它们
const SITE = new Set(['src/main.js', 'src/iconset.js', 'src/i18n.js', 'src/categories.js', 'src/category-icons.js', 'src/snap.js'])
const isSite = f => SITE.has(f) || f.endsWith('.vue') || f.startsWith('src/site/') || f === 'pkg:vue'
// 核心包 @jannchie/icons 的入口（见 scripts/build-packages.mjs）：没有运行时依赖
const CORE_ENTRIES = ['src/export.js', 'src/options.js', 'src/render.js', 'src/tone.js', 'src/runtime.js', 'src/svg-root.js', 'src/meta/meta.js', ...srcFiles.filter(isIcon)]

describe('architecture', () => {
  it('src/ has no import cycles', () => {
    // Tarjan 强连通分量：多于一个模块的分量就是循环
    let index = 0
    const stack = []
    const on = new Set()
    const idx = new Map()
    const low = new Map()
    const cycles = []
    const visit = (v) => {
      idx.set(v, index)
      low.set(v, index++)
      stack.push(v)
      on.add(v)
      for (const w of graph.get(v) ?? []) {
        if (!graph.has(w))
          continue
        if (!idx.has(w)) {
          visit(w)
          low.set(v, Math.min(low.get(v), low.get(w)))
        }
        else if (on.has(w)) {
          low.set(v, Math.min(low.get(v), idx.get(w)))
        }
      }
      if (low.get(v) === idx.get(v)) {
        const scc = []
        let w
        do {
          w = stack.pop()
          on.delete(w)
          scc.push(w)
        } while (w !== v)
        if (scc.length > 1)
          cycles.push(scc.sort().join(' ↔ '))
      }
    }
    for (const v of graph.keys()) {
      if (!idx.has(v))
        visit(v)
    }
    expect(cycles).toEqual([])
  })

  it('relative imports resolve to existing files', () => {
    const missing = [...graph].flatMap(([f, deps]) => deps.filter(d => !d.startsWith('pkg:') && !known.has(d) && !d.endsWith('.json') && !d.startsWith('packages/')).map(d => `${f} → ${d}`))
    expect(missing).toEqual([])
  })

  it('the core package reaches no site module, no Clipper2 and no npm dependency', () => {
    const reach = closure(CORE_ENTRIES)
    const bad = [...reach].filter(f => isSite(f) || f === 'src/fill.js' || f.startsWith('pkg:'))
    expect(bad).toEqual([])
  })

  it('icon files do not import the engine or the site', () => {
    const ENGINE = new Set(['src/render.js', 'src/export.js', 'src/svg.js', 'src/fill.js', 'src/svg-root.js', 'src/runtime.js', 'src/icon-list.js'])
    const bad = srcFiles.filter(isIcon).flatMap(f => graph.get(f).filter(d => ENGINE.has(d) || isSite(d)).map(d => `${f} → ${d}`))
    expect(bad).toEqual([])
  })

  it('svg-root.js and runtime.js stay free of the engine (the ./static entry and framework packages ship only them)', () => {
    expect([...closure(['src/runtime.js'])].sort()).toEqual(['src/runtime.js', 'src/svg-root.js'])
  })

  it('the shared conventions are leaf modules', () => {
    // 路径语法、线宽换算、间距、档位、角色：引擎和绘制层都建在它们上面，它们自己不依赖任何模块
    for (const f of ['src/path-data.js', 'src/line-widths.js', 'src/clearance.js', 'src/options.js', 'src/tone.js', 'src/icon-list.js'])
      expect(graph.get(f), f).toEqual([])
  })

  it('the engine does not depend on drawing helpers', () => {
    // 收尾、渲染、导出只认路径和样式标记，不认识具体造型（scene、symbols、系列模块……）
    const ENGINE = ['src/svg.js', 'src/render.js', 'src/export.js', 'src/fill.js']
    const ALLOWED = new Set([...ENGINE, 'src/path-data.js', 'src/line-widths.js', 'src/clearance.js', 'src/clip.js', 'src/transform.js', 'src/options.js', 'src/tone.js', 'src/svg-root.js', 'pkg:@countertype/clipper2-ts'])
    const bad = ENGINE.flatMap(f => graph.get(f).filter(d => !ALLOWED.has(d)).map(d => `${f} → ${d}`))
    expect(bad).toEqual([])
  })

  it('scripts load icons through scripts/icons.mjs and import src/ directly, not through Vite', () => {
    const scripts = [...walk(join(ROOT, 'scripts')), 'vite.config.js']
    const bad = []
    for (const f of scripts) {
      const src = readFileSync(join(ROOT, f), 'utf8')
      // vite 只用来打包（packages.mjs 的 buildLib）和预览站本身
      if (f !== 'scripts/packages.mjs' && f !== 'vite.config.js' && importsOf(f).some(s => s === 'vite' || s.startsWith('vite/')))
        bad.push(`${f} imports vite`)
      if (/ssrLoadModule/.test(src))
        bad.push(`${f} uses Vite SSR`)
      // 列图标目录只在 icons.mjs 里做一次
      if (f !== 'scripts/icons.mjs' && /readdirSync\([^)]*src\/icons/.test(src))
        bad.push(`${f} lists src/icons itself (use iconNames from scripts/icons.mjs)`)
    }
    expect(bad).toEqual([])
  })

  it('every script that imports src/ through extensionless paths runs with node-ext', () => {
    const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'))
    // 自己或间接导入的模块里有省略后缀的相对导入（Vite 习惯），Node 原生解析不了，就要 node-ext
    const needsExt = (file, seen = new Set()) => {
      if (seen.has(file))
        return false
      seen.add(file)
      return importsOf(file).some((s) => {
        if (!s.startsWith('.'))
          return false
        if (!/\.(?:m?js|json)$/.test(s))
          return true
        const target = normalize(join(dirname(file), s)).replace(/\\/g, '/')
        return !target.endsWith('.json') && needsExt(target, seen)
      })
    }
    const bad = Object.entries(pkg.scripts).flatMap(([name, cmd]) => {
      const m = /^node (?<ext>--import \.\/scripts\/node-ext\.mjs )?(?<file>scripts\/\S+\.mjs)/.exec(cmd)
      return m && !m.groups.ext && needsExt(m.groups.file) ? [`${name}: ${cmd}`] : []
    })
    expect(bad).toEqual([])
  })
})
