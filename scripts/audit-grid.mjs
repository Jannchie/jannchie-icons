// 像素网格审计：细字重（线宽 1）下，横竖线的中心应落在 .5 坐标上——1 倍屏 24px、48px 和所有 2 倍屏下才天生清晰
// 列出不在 .5 上的横竖线（缩小的符号 detail、内部细线 thin、点、实心形状不算），按发虚长度占比从高到低排
// 用法：pnpm audit:grid [名字前缀...] [--json] [--baseline [文件]] [--update-baseline [文件]] [--max <n>]
// 门禁：--baseline 和 scripts/audit-grid.baseline.json 里的已知问题比，有新问题就以非零码退出（见 audit-baseline.mjs）
import { gate, load, setup } from './audit-baseline.mjs'

const { opts, quiet, server, names, icons } = await setup('grid')
const { json } = opts
const { axisLines, finalize } = await load(server, '/src/svg.js')

const STROKE = 1
const onGrid = v => Math.abs(((v % 1) + 1) % 1 - 0.5) < 0.01
const report = []
// 门禁用：{ 图标名: ['x 12.25', …] }
const issues = {}
for (const { name, draw } of icons) {
  const paths = finalize(draw({ radius: 2, stroke: STROKE, weight: 'light' }), STROKE)
    .filter(p => !p.detail && !p.fill && !p.dot && !p.thin)
  let total = 0
  const off = new Map() // 'x 12' → 总长度
  for (const [axis, v, len] of paths.flatMap(p => axisLines(p.d))) {
    total += len
    if (!onGrid(v)) {
      const key = `${axis} ${+v.toFixed(3)}`
      off.set(key, (off.get(key) ?? 0) + len)
    }
  }
  const blurry = [...off.values()].reduce((a, b) => a + b, 0)
  if (blurry > 0.01) {
    (issues[name] ??= []).push(...off.keys())
    report.push({ name, share: +(blurry / total).toFixed(3), lines: [...off].map(([k, len]) => `${k} (${+len.toFixed(2)})`) })
  }
}
report.sort((a, b) => b.share - a.share || a.name.localeCompare(b.name))

if (json) {
  console.log(JSON.stringify(report, null, 2))
}
else {
  for (const r of quiet ? [] : report)
    console.log(`${r.name.padEnd(36)} ${(r.share * 100).toFixed(0).padStart(3)}%  ${r.lines.join(', ')}`)
  console.log(`\n${report.length} / ${names.length} icons have axis-aligned strokes off the .5 grid`)
}
await server.close()
process.exitCode = gate('grid', issues, names, opts)
