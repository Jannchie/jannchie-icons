import { circle } from '../geometry'
import { dot } from '../scene'
import { solid } from '../solid'

// 思考气泡（推理、思考中）：右上一朵蓬松的云（椭圆上取 8 个点，相邻两点之间一段外凸的圆弧）+ 往左下拖的两个小圆
const [cx, cy, a, b] = [13, 9, 7, 4.75]
const N = 8
const f = v => +v.toFixed(3)
const pts = Array.from({ length: N }, (_, i) => {
  const t = (i + 0.5) / N * 2 * Math.PI
  return [cx + a * Math.cos(t), cy + b * Math.sin(t)]
})
const cloud = `M${f(pts[0][0])} ${f(pts[0][1])}${pts.map((p, i) => {
  const q = pts[(i + 1) % N]
  const r = f(Math.hypot(q[0] - p[0], q[1] - p[1]) * 0.7)
  return `A${r} ${r} 0 0 1 ${f(q[0])} ${f(q[1])}`
}).join('')}Z`
const trail = circle(7, 17.5, 1.5)

export default () => [cloud, trail, dot(4, 20.5)]

// 实心：云和小圆都填实
export const fill = () => [solid(cloud), solid(trail), dot(4, 20.5)]
