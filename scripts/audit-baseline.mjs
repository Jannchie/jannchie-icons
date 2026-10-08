// 审计门禁：三个审计脚本（audit-grid / audit-caps / audit-crowd）共用
// 每个审计把结果整理成 { 图标名: [问题键…] }（问题键是能定位到具体一处的字符串，比如 'x 12.25'、'bold (3, 4)'），然后：
// - --baseline [文件]：和基线（已知问题清单，默认 scripts/audit-<名>.baseline.json，提交进仓库）比，出现基线里没有的问题就以 1 退出
// - --update-baseline [文件]：把当前结果写成基线（带名字前缀时只替换这些图标的条目）
// - --max <n>：有问题的图标超过 n 个就以 1 退出
// 都不给时只打印报告、以 0 退出（原来的用法）
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { createServer } from 'vite'

// 解析命令行：名字前缀、--json，以及门禁参数
export function parseArgs(argv, audit) {
  const opts = { json: false, prefixes: [], baseline: null, update: false, max: null }
  const defaultFile = `scripts/audit-${audit}.baseline.json`
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    const value = () => (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : null)
    if (a === '--json') {
      opts.json = true
    }
    else if (/^--(?:update-)?baseline(?:=|$)/.test(a)) {
      opts.baseline = a.includes('=') ? a.split('=')[1] : value() ?? defaultFile
      opts.update ||= a.startsWith('--update-')
    }
    else if (a === '--max' || a.startsWith('--max=')) {
      const n = Number(a.includes('=') ? a.split('=')[1] : value())
      if (!Number.isInteger(n) || n < 0)
        throw new Error('--max needs a non-negative integer')
      opts.max = n
    }
    else if (a.startsWith('--')) {
      throw new Error(`unknown option ${a}`)
    }
    else {
      opts.prefixes.push(a)
    }
  }
  return opts
}

// issues：{ 图标名: [问题键…] }（只放有问题的图标）；names：这次审计覆盖的全部图标名。返回退出码
export function gate(audit, issues, names, opts) {
  const count = Object.keys(issues).length
  let failed = false
  if (opts.max !== null && count > opts.max) {
    console.error(`\n[audit:${audit}] ${count} icons have issues, more than --max ${opts.max}`)
    failed = true
  }
  if (!opts.baseline)
    return failed ? 1 : 0

  const scope = new Set(names)
  const saved = existsSync(opts.baseline) ? JSON.parse(readFileSync(opts.baseline, 'utf8')) : null
  if (opts.update) {
    // 带前缀时只替换这次覆盖到的图标，其余保留
    const kept = Object.entries(saved ?? {}).filter(([name]) => !scope.has(name))
    const next = Object.fromEntries([...kept, ...Object.entries(issues)].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0)).map(([n, keys]) => [n, [...new Set(keys)].sort()]))
    writeFileSync(opts.baseline, `${JSON.stringify(next, null, 2)}\n`)
    const total = Object.values(next).reduce((s, k) => s + k.length, 0)
    console.log(`\n[audit:${audit}] baseline written: ${Object.keys(next).length} icons, ${total} known issues → ${opts.baseline}`)
    return failed ? 1 : 0
  }
  if (!saved) {
    console.error(`\n[audit:${audit}] baseline ${opts.baseline} not found; create it with --update-baseline`)
    return 1
  }

  const fresh = []
  for (const [name, keys] of Object.entries(issues)) {
    const known = new Set(saved[name] ?? [])
    const added = [...new Set(keys)].filter(k => !known.has(k))
    if (added.length)
      fresh.push(`${name}: ${added.join(', ')}`)
  }
  // 基线里有、现在已经没了的问题：修好了，提示收紧基线（不算失败）
  let fixed = 0
  for (const [name, keys] of Object.entries(saved)) {
    if (!scope.has(name))
      continue
    const now = new Set(issues[name] ?? [])
    fixed += keys.filter(k => !now.has(k)).length
  }
  const known = Object.values(saved).reduce((s, k) => s + k.length, 0)
  if (fresh.length) {
    console.error(`\n[audit:${audit}] ${fresh.length} icons have issues not in the baseline (${opts.baseline}):`)
    for (const line of fresh)
      console.error(`  ${line}`)
    console.error(`\nFix the geometry, or if the issue is accepted, run: node scripts/audit-${audit}.mjs --update-baseline`)
    failed = true
  }
  else {
    console.log(`\n[audit:${audit}] no new issues (${known} known in baseline)`)
  }
  if (fixed)
    console.log(`[audit:${audit}] ${fixed} baseline issues are gone; shrink the baseline with: node scripts/audit-${audit}.mjs --update-baseline`)
  return failed ? 1 : 0
}

// vite SSR 加载模块：机器负载高时偶尔会「transport invoke timed out」，重试几次再放弃
export async function load(server, id, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      return await server.ssrLoadModule(id)
    }
    catch (e) {
      if (i >= tries || !/timed out/i.test(String(e?.message ?? e)))
        throw e
      console.error(`[audit] loading ${id} timed out, retrying (${i}/${tries - 1})`)
    }
  }
}

// 只在 SSR 里加载 src 的 vite 服务器（审计、品牌素材、构建包的脚本共用）：
// 不做依赖预构建，几个脚本并行跑时也不会抢着改写 node_modules/.vite
export const createSsrServer = () => createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', logLevel: 'error', optimizeDeps: { noDiscovery: true, include: [] } })

// 审计脚本的启动样板：解析命令行、起服务器、加载图标，按名字前缀筛选
// 不带前缀时一次加载全部图标（src/iconset.js）；带前缀时只加载匹配的几个模块，不用等全部图标转换完
// 返回 { opts, quiet（门禁模式只打印汇总和新问题，不列完整报告）, server, names, icons（{ name, draw, animation }，和 names 同序）}
export async function setup(audit) {
  const opts = parseArgs(process.argv.slice(2), audit)
  const server = await createSsrServer()
  const names = readdirSync('src/icons').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3))
    .filter(n => !opts.prefixes.length || opts.prefixes.some(p => n.startsWith(p))).sort()
  let icons
  if (opts.prefixes.length) {
    icons = []
    for (const name of names) {
      const mod = await load(server, `/src/icons/${name}.js`)
      icons.push({ name, draw: mod.default, animation: mod.animation })
    }
  }
  else {
    const { byName } = await load(server, '/src/iconset.js')
    icons = names.map(n => byName.get(n))
  }
  return { opts, quiet: !!opts.baseline && !opts.json, server, names, icons }
}
