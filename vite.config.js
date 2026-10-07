import { execFileSync } from 'node:child_process'
import { readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig, normalizePath } from 'vite'

// 每个图标最后修改的时间（毫秒），给预览页「最近修改」排序用：virtual:icon-times → { 名字: 时间 }
// 开发时读文件的修改时间（刚改的图标立刻排到最前，改了文件就让这个模块失效重新取）；
// 构建时文件都是刚检出的，改用 git 里每个文件最后一次提交的时间（CI 需要完整历史，见 deploy.yml 的 fetch-depth）
const ICONS = normalizePath(resolve('src/icons'))
const ID = 'virtual:icon-times'
function fileTimes() {
  return Object.fromEntries(readdirSync(ICONS).filter(f => f.endsWith('.js')).map(f => [f.slice(0, -3), Math.round(statSync(resolve(ICONS, f)).mtimeMs)]))
}
function gitTimes() {
  const times = fileTimes()
  let at = 0
  const seen = new Set()
  try {
    const log = execFileSync('git', ['log', '--format=%ct', '--name-only', '--', 'src/icons'], { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
    for (const line of log.split('\n')) {
      if (/^\d+$/.test(line))
        at = Number(line) * 1000
      else if (line.startsWith('src/icons/') && line.endsWith('.js')) {
        const name = line.slice(10, -3)
        // git log 从新到旧，同一个文件第一次出现就是最后一次修改
        if (!seen.has(name) && name in times) {
          seen.add(name)
          times[name] = at
        }
      }
    }
  }
  catch {}
  return times
}
function iconTimes() {
  let dev = false
  return {
    name: 'icon-times',
    configResolved: (config) => { dev = config.command === 'serve' },
    resolveId: id => (id === ID ? `\0${ID}` : undefined),
    load: id => (id === `\0${ID}` ? `export default ${JSON.stringify(dev ? fileTimes() : gitTimes())}` : undefined),
    handleHotUpdate({ file, server, modules }) {
      if (!normalizePath(file).startsWith(ICONS))
        return
      const mod = server.moduleGraph.getModuleById(`\0${ID}`)
      if (!mod)
        return
      server.moduleGraph.invalidateModule(mod)
      return [...modules, mod]
    },
  }
}

export default defineConfig({
  // 部署在自定义域名 icons.jannchie.com 的根路径
  base: '/',
  plugins: [vue(), iconTimes()],
})
