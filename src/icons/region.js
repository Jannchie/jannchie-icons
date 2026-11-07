import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { dot } from '../scene'
import { clear, solid } from '../solid'

// 区域：一块不规则的五边形边界 + 五个顶点上的方形手柄（编辑区域边界的样子）
// 左边是竖直的一条边，落在 x = 4.5；其余四条边都是斜的，五个顶点错落，不像正多边形
const pts = [[4.5, 6.5], [14, 3.5], [20.5, 10.5], [16, 20.5], [4.5, 16.5]]
export default ({ radius }) => [
  rounded(pts, Math.min(radius, 0.5)),
  ...pts.map(([x, y]) => dot(x, y, 3.5)),
]

// 实心：边框和手柄照旧是线、圆点（尖角模式下也是圆点），里面的区域填实、和边框之间留 GAP 的缝——读成「被选中、填满的区域」。
// 整块填实再在顶点手柄四周让缝的话，五个顶点都被啃掉一圈，五边形成了一个齿轮
export const fill = ({ radius }) => {
  const outline = rounded(pts, Math.min(radius, 0.5))
  const handles = pts.map(([x, y]) => ({ ...dot(x, y, 3.5), round: true }))
  const edges = pts.map((p, i) => `M${p.join(' ')}L${pts[(i + 1) % pts.length].join(' ')}`)
  return [solid(outline), clear(edges, GAP), outline, ...handles]
}
