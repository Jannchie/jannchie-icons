// 拥挤审计：常规（1.5）、粗（2）两档线宽下，互不相连的线之间可见空隙太小（< 0.5），加粗后会糊成一团
// 每个图标给出两档下最小的空隙和挤在一起的对数，按最小空隙从小到大排
// 用法：pnpm audit:crowd [名字前缀...] [--json] [--baseline [文件]] [--update-baseline [文件]] [--max <n>]
// 门禁：--baseline 和 scripts/audit-crowd.baseline.json 里的已知问题比，有新问题就以非零码退出（见 audit-baseline.mjs）
import { gate, load, setup } from './audit-baseline.mjs'

const { opts, quiet, server, names, icons } = await setup('crowd')
const { json } = opts
const { finalize, crowdedPairs } = await load(server, '/src/svg.js')
const { WEIGHTS } = await load(server, '/src/options.js')

const report = []
// 门禁用：{ 图标名: ['bold @(12, 8.5)', …] }
const issues = {}
for (const { name, draw, animation } of icons) {
  if (animation)
    continue
  const row = { name, min: Infinity, weights: [] }
  for (const w of WEIGHTS.filter(w => w.id !== 'light')) {
    const pairs = crowdedPairs(finalize(draw({ radius: 2, stroke: w.stroke, weight: w.id }), w.stroke), w.stroke)
    if (!pairs.length)
      continue
    (issues[name] ??= []).push(...pairs.map(p => `${w.id} @(${p.at.join(', ')})`))
    row.min = Math.min(row.min, pairs[0].gap)
    row.weights.push(`${w.id} ${pairs.length}: ${pairs.slice(0, 4).map(p => `${p.gap.toFixed(2)}@(${p.at.join(', ')})`).join(' ')}`)
  }
  if (row.weights.length)
    report.push(row)
}
report.sort((a, b) => a.min - b.min || a.name.localeCompare(b.name))

if (json) {
  console.log(JSON.stringify(report, null, 2))
}
else {
  for (const r of quiet ? [] : report)
    console.log(`${r.name.padEnd(36)} ${r.min.toFixed(2).padStart(5)}  ${r.weights.join(' | ')}`)
  console.log(`\n${report.length} / ${names.length} icons have strokes closer than 0.5 apart at regular or bold`)
}
await server.close()
process.exitCode = gate('crowd', issues, names, opts)
