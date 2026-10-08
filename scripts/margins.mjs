// 留白统计：每个图标在常规字重、圆角 2 下的墨迹（含半个线宽）离画布四边的距离，见 docs/design.md
// 用法：pnpm margins [名字前缀...]；不带参数时统计全部，并列出离边最近的图标
import { readdirSync } from 'node:fs'
import { pathToFileURL } from 'node:url'
import { segments, samples } from '../src/clip.js'
import { finalize } from '../src/svg.js'

const prefixes = process.argv.slice(2)
const dir = new URL('../src/icons/', import.meta.url)
const names = readdirSync(dir).filter(f => f.endsWith('.js')).map(f => f.slice(0, -3)).filter(n => !prefixes.length || prefixes.some(p => n.startsWith(p))).sort()
const mods = await Promise.all(names.map(n => import(pathToFileURL(new URL(`${n}.js`, dir).pathname.slice(1)))))
const stroke = 1.5
const rows = []
names.forEach((name, i) => {
  if (mods[i].animation)
    return
  let [x0, y0, x1, y1] = [Infinity, Infinity, -Infinity, -Infinity]
  for (const p of finalize(mods[i].default({ radius: 2, stroke, weight: 'regular' }), stroke)) {
    const h = (p.width ?? stroke) / 2
    for (const s of segments(p.d)) {
      for (const g of s.segs) {
        for (const [x, y] of samples(g, 12))
          [x0, y0, x1, y1] = [Math.min(x0, x - h), Math.min(y0, y - h), Math.max(x1, x + h), Math.max(y1, y + h)]
      }
    }
  }
  if (x0 < Infinity)
    rows.push({ name, l: x0, t: y0, r: 24 - x1, b: 24 - y1 })
})
const f = v => v.toFixed(2)
const min = r => Math.min(r.l, r.t, r.r, r.b)
if (prefixes.length) {
  for (const r of rows)
    console.log(`${r.name.padEnd(32)} left ${f(r.l)}  top ${f(r.t)}  right ${f(r.r)}  bottom ${f(r.b)}`)
}
else {
  const sorted = rows.map(min).sort((a, b) => a - b)
  console.log(`${rows.length} icons; closest edge p5 / p50 / p95: ${[0.05, 0.5, 0.95].map(p => f(sorted[Math.floor(p * (sorted.length - 1))])).join(' / ')}`)
  console.log(`under 1.5: ${sorted.filter(m => m < 1.5).length}; off-center by more than 0.3: ${rows.filter(r => Math.abs(r.l - r.r) > 0.6 || Math.abs(r.t - r.b) > 0.6).length}`)
  console.log(`closest: ${[...rows].sort((a, b) => min(a) - min(b)).slice(0, 15).map(r => `${r.name} ${f(min(r))}`).join(', ')}`)
}
