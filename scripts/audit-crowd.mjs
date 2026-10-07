// 拥挤审计：常规（1.5）、粗（2）两档线宽下，互不相连的线之间可见空隙太小（< 0.5），加粗后会糊成一团
// 每个图标给出两档下最小的空隙和挤在一起的对数，按最小空隙从小到大排
// 用法：pnpm audit:crowd [名字前缀...] [--json]
import { readdirSync } from 'node:fs'
import { createServer } from 'vite'

const args = process.argv.slice(2)
const json = args.includes('--json')
const prefixes = args.filter(a => !a.startsWith('--'))
const server = await createServer({ server: { middlewareMode: true, ws: false }, appType: 'custom', logLevel: 'error' })
const { finalize, crowdedPairs } = await server.ssrLoadModule('/src/svg.js')
const { WEIGHTS } = await server.ssrLoadModule('/src/options.js')

const names = readdirSync('src/icons').filter(f => f.endsWith('.js')).map(f => f.slice(0, -3))
  .filter(n => !prefixes.length || prefixes.some(p => n.startsWith(p))).sort()

const report = []
for (const name of names) {
  const mod = await server.ssrLoadModule(`/src/icons/${name}.js`)
  if (mod.animation)
    continue
  const row = { name, min: Infinity, weights: [] }
  for (const w of WEIGHTS.filter(w => w.id !== 'light')) {
    const pairs = crowdedPairs(finalize(mod.default({ radius: 2, stroke: w.stroke, weight: w.id }), w.stroke), w.stroke)
    if (!pairs.length)
      continue
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
  for (const r of report)
    console.log(`${r.name.padEnd(36)} ${r.min.toFixed(2).padStart(5)}  ${r.weights.join(' | ')}`)
  console.log(`\n${report.length} / ${names.length} icons have strokes closer than 0.5 apart at regular or bold`)
}
await server.close()
