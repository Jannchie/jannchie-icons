// 尖角线头审计：尖角模式（方头线帽 + 斜接转角）下，接在别的线上的线头，方头的角有没有从对面那条线外侧冒出来
// 每个图标按 light / regular / bold 三档线宽各算一遍：修复前（不缩线头）和修复后（finalize 的 sharp）各有几处冒头
// 用法：pnpm audit:caps [名字前缀...] [--json] [--baseline [文件]] [--update-baseline [文件]] [--max <n>]
// 门禁：--baseline 和 scripts/audit-caps.baseline.json 里的已知问题比，有新问题就以非零码退出（见 audit-baseline.mjs）
import { readdirSync } from 'node:fs'
import { createServer } from 'vite'
import { gate, load, parseArgs } from './audit-baseline.mjs'

const opts = parseArgs(process.argv.slice(2), 'caps')
const { json, prefixes } = opts
// 门禁模式只打印汇总和新问题，不列完整报告
const quiet = opts.baseline && !json
// 不做依赖预构建：只在 SSR 里加载 src，三个审计并行跑（audit-icons.mjs）时也不会抢着改写 node_modules/.vite
const server = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', logLevel: 'error', optimizeDeps: { noDiscovery: true, include: [] } })
const { finalize, squareCapPokes } = await load(server, '/src/svg.js')
const { WEIGHTS } = await load(server, '/src/options.js')

const names = readdirSync('src/icons').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3))
  .filter(n => !prefixes.length || prefixes.some(p => n.startsWith(p))).sort()

const report = []
// 门禁用：{ 图标名: ['bold (3, 4)', …] }
const issues = {}
let before = 0
for (const name of names) {
  const mod = await load(server, `/src/icons/${name}.js`)
  if (mod.animation)
    continue
  const row = { name, before: 0, after: 0, weights: [] }
  for (const w of WEIGHTS) {
    const opts = { radius: 0, stroke: w.stroke, weight: w.id }
    const b = squareCapPokes(finalize(mod.default(opts), w.stroke), w.stroke).length
    const pokes = squareCapPokes(finalize(mod.default(opts), w.stroke, { sharp: true }), w.stroke)
    row.before += b
    row.after += pokes.length
    if (pokes.length)
      (issues[name] ??= []).push(...pokes.map(p => `${w.id} (${p.at.join(', ')})`))
    if (pokes.length)
      row.weights.push(`${w.id}: ${pokes.map(p => `(${p.at.join(', ')}) +${p.need === Infinity ? p.excess.toFixed(2) : p.need.toFixed(2)}`).join(' ')}`)
  }
  before += row.before ? 1 : 0
  if (row.after)
    report.push(row)
}
report.sort((a, b) => b.after - a.after || a.name.localeCompare(b.name))

if (json) {
  console.log(JSON.stringify(report, null, 2))
}
else {
  for (const r of quiet ? [] : report)
    console.log(`${r.name.padEnd(36)} ${String(r.after).padStart(3)}  ${r.weights.join(', ')}`)
  console.log(`\nbefore fix: ${before} / ${names.length} icons had poking square caps; after fix: ${report.length} still do`)
}
await server.close()
process.exitCode = gate('caps', issues, names, opts)
