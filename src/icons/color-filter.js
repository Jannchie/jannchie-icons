import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 滤色：三个交叠的圆
export default () => [
  circle(12, 8.5, 5),
  circle(8.5, 14.5, 5),
  circle(15.5, 14.5, 5),
]

// 实心：三个圆合成一块，只挖掉落在别的圆里的那几段弧，外轮廓不动，交叠出的七块各自分开（像韦恩图）
const discs = [[12, 8.5], [8.5, 14.5], [15.5, 14.5]]
const R = 5
const centroid = [discs.reduce((s, c) => s + c[0], 0) / 3, discs.reduce((s, c) => s + c[1], 0) / 3]
// 圆 a 和圆 b 的两个交点里离第三个圆心远的那个：落在外轮廓上
function outer(a, b, far) {
  const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
  const d = Math.hypot(dx, dy)
  const h = Math.sqrt(R * R - d * d / 4)
  const m = [a[0] + dx / 2, a[1] + dy / 2]
  const pts = [[m[0] - dy / d * h, m[1] + dx / d * h], [m[0] + dy / d * h, m[1] - dx / d * h]]
  const dist = p => Math.hypot(p[0] - far[0], p[1] - far[1])
  return dist(pts[0]) > dist(pts[1]) ? pts[0] : pts[1]
}
const f = p => p.map(v => +v.toFixed(3)).join(' ')
// 每个圆朝向中心的那段弧：两端是它和另外两个圆的外交点
// 两端顺着外交点处的凹口（两圆圆心连线的中垂线，朝外）各穿出 E：停在交点上时圆头只擦到外缘，凹口里留一层发丝；
// 顺着圆的切线穿出去又会贴着外轮廓走、把轮廓削掉一层
const E = 2
const out = (p, a, b) => {
  const m = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2]
  const l = Math.hypot(p[0] - m[0], p[1] - m[1])
  return [p[0] + (p[0] - m[0]) / l * E, p[1] + (p[1] - m[1]) / l * E]
}
const inner = discs.map((c, i) => {
  const [b, e] = [discs[(i + 1) % 3], discs[(i + 2) % 3]]
  const [p, q] = [outer(c, b, e), outer(c, e, b)]
  const ang = pt => Math.atan2(pt[1] - c[1], pt[0] - c[0])
  const norm = a => ((a % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
  // 顺着角度增大的方向从 p 走，先经过中心方向再到 q，就取 sweep = 1
  const sweep = norm(ang(centroid) - ang(p)) < norm(ang(q) - ang(p)) ? 1 : 0
  return `M${f(out(p, c, b))}L${f(p)}A${R} ${R} 0 0 ${sweep} ${f(q)}L${f(out(q, c, e))}`
})
export const fill = () => [solid(discs.map(c => circle(...c, R))), knock(inner)]
