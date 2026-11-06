import { circle, rounded } from '../geometry'
import { hole, solid } from '../solid'

// 设置：8 齿齿轮 + 中心圆；齿根半径 7、齿顶半径约 8.6，齿顶比齿根窄
const [cx, cy] = [12, 12]
// 齿顶半径取 8.5 / cos9°：上下左右四个齿顶的平边正好落在 3.5 / 20.5
const [inner, outer] = [7, 8.5 / Math.cos(9 * Math.PI / 180)]
const [rootHalf, tipHalf] = [15, 9].map(d => d * Math.PI / 180)
const at = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)]
const teeth = Array.from({ length: 8 }, (_, i) => {
  const a = (i * 45 - 90) * Math.PI / 180
  return [at(inner, a - rootHalf), at(outer, a - tipHalf), at(outer, a + tipHalf), at(inner, a + rootHalf)]
}).flat()

export default ({ radius }) => [
  rounded(teeth, Math.min(radius, 1)),
  circle(cx, cy, 3),
]

// 实心：齿轮一块，中心挖一个圆洞（洞外扩半个线宽后半径 3，和描边版中心圆的中心线一样大）
export const fill = ({ radius, stroke }) => [
  solid(rounded(teeth, Math.min(radius, 1))),
  hole(circle(cx, cy, 3 - stroke / 2)),
]
