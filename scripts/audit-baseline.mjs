// 审计门禁：三个审计脚本（audit-grid / audit-caps / audit-crowd）共用
// 每个审计把结果整理成 { 图标名: [问题键…] }（问题键是能定位到具体一处的字符串，比如 'x 12.25'、'bold (3, 4)'），然后：
// - --baseline [文件]：和基线（已知问题清单，默认 scripts/audit-<名>.baseline.json，提交进仓库）比，出现基线里没有的问题就以 1 退出
// - --update-baseline [文件]：把当前结果写成基线（带名字前缀时只替换这些图标的条目）
// - --max <n>：有问题的图标超过 n 个就以 1 退出
// 都不给时只打印报告、以 0 退出（原来的用法）
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

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
    else if (a === '--baseline' || a.startsWith('--baseline=')) {
      opts.baseline = a.includes('=') ? a.split('=')[1] : value() ?? defaultFile
    }
    else if (a === '--update-baseline' || a.startsWith('--update-baseline=')) {
      opts.baseline = a.includes('=') ? a.split('=')[1] : value() ?? defaultFile
      opts.update = true
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
