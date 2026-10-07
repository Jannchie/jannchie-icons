// 尖角线头审计：尖角模式（方头线帽 + 斜接转角）下，接在别的线上的线头，方头的角有没有从对面那条线外侧冒出来
// 每个图标按 light / regular / bold 三档线宽各算一遍：修复前（不缩线头）和修复后（finalize 的 sharp）各有几处冒头
// 用法：pnpm audit:caps [名字前缀...] [--json]
import { readdirSync } from 'node:fs'
import { createServer } from 'vite'

const args = process.argv.slice(2)
const json = args.includes('--json')
const prefixes = args.filter(a => !a.startsWith('--'))
const server = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', logLevel: 'error' })
const { finalize, squareCapPokes } = await server.ssrLoadModule('/src/svg.js')
const { WEIGHTS } = await server.ssrLoadModule('/src/options.js')

const names = readdirSync('src/icons').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3))
  .filter(n => !prefixes.length || prefixes.some(p => n.startsWith(p))).sort()

const report = []
let before = 0
for (const name of names) {
  const mod = await server.ssrLoadModule(`/src/icons/${name}.js`)
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
  for (const r of report)
    console.log(`${r.name.padEnd(36)} ${String(r.after).padStart(3)}  ${r.weights.join(', ')}`)
  console.log(`\nbefore fix: ${before} / ${names.length} icons had poking square caps; after fix: ${report.length} still do`)
}
await server.close()
