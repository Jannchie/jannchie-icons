import { rounded } from '../geometry'
// 罗经玫瑰（地图上的指北针）：前层四角星（北刺尖半径 10.5，其余 9，凹点半径 3.5），每根主刺一道细中线（从刺尖到中心，
// 表示刺是两个面拼成的），北刺的顺时针一半填实，标出北方；
// 后层四根斜刺（尖半径 8.5，根部 ±20°、半径 3）只画露在主刺之间的部分：两条侧边从刺尖往里走，走到离主刺边 2.25 处停下
// （手工算出露出的那一段，不用遮挡刀：遮挡刀会把北刺的填色也一起擦掉）
// 刺尖的夹角小于 60°，尖角模式下会被斜接上限切出一个很小的平头
const [cx, cy] = [12, 12.5]
const P = (r, deg) => { const a = deg * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)] }
const f = p => p.map(v => +v.toFixed(3)).join(' ')
const main = [0, 1, 2, 3].map(k => [P(k ? 9 : 10.5, -90 + k * 90), -90 + k * 90])
const inner = d => P(3.5, d)
const front = main.flatMap(([t, d]) => [t, inner(d + 45)])
// 主星的边（线段）
const edges = front.map((p, i) => [p, front[(i + 1) % front.length]])
const segDist = (p, [a, b]) => {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)))
  return Math.hypot(p[0] - a[0] - dx * t, p[1] - a[1] - dy * t)
}
const clear = p => Math.min(...edges.map(e => segDist(p, e)))
// 从刺尖沿侧边往根部走，停在离主星边 2.25 处
function side(tip, base) {
  let last = tip
  for (let t = 0; t <= 1; t += 0.002) {
    const p = [tip[0] + (base[0] - tip[0]) * t, tip[1] + (base[1] - tip[1]) * t]
    if (clear(p) < 2.25) break
    last = p
  }
  return last
}
const back = [0, 1, 2, 3].map((k) => {
  const d = -45 + k * 90
  const tip = P(8.5, d)
  return `M${f(side(tip, P(3, d - 20)))}L${f(tip)}L${f(side(tip, P(3, d + 20)))}`
}).join('')
const half = ([t, d], s) => ({ d: rounded([[cx, cy], t, inner(d + s * 45)], 0), fill: true })
export default () => [
  rounded(front, 0),
  back,
  { d: main.map(([t]) => `M${f(t)}L${cx} ${cy}`).join(''), thin: true },
  half(main[0], 1),
]
