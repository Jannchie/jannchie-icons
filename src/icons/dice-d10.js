import { GAP } from '../clearance'
import { crisp, rounded } from '../geometry'
import { clear, cutout, solid } from '../solid'

// 十面骰（d10）：上下尖、两侧略平的外轮廓 + 中间的风筝形正面 + 正面三个下顶点连到外轮廓的棱
// 两侧短竖边在 3 / 21、中间那条竖棱在中轴 12 上
const outer = [[12, 2.5], [21, 11], [21, 13], [12, 21.5], [3, 13], [3, 11]]
const face = [[12, 2.5], [16.75, 12.5], [12, 15.5], [7.25, 12.5]]
const edge = (a, b) => `M${a.join(' ')}L${b.join(' ')}`
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded(face, crisp(radius)),
  edge(face[1], outer[2]),
  edge(face[2], outer[3]),
  edge(face[3], outer[4]),
]

// 实心：风筝形正面整块画在前面，外轮廓在它四周让出 GAP 的缝（见 solid.js 的 stacked，和 dice-d8 一样）——
// 正面的上顶点就是外轮廓的上顶点，用线去挖正面的边会把这个尖啃出一个缺口；
// 三条棱挖成 GAP 宽的直缝，从正面的下顶点一直穿出外轮廓（和正面四周的缝一样宽），四周分成三块
const slit = (a, b) => {
  const l = Math.hypot(b[0] - a[0], b[1] - a[1])
  const [ux, uy] = [(b[0] - a[0]) / l, (b[1] - a[1]) / l]
  const [nx, ny] = [-uy * GAP / 2, ux * GAP / 2]
  const end = [b[0] + ux * 3, b[1] + uy * 3]
  const pt = ([x, y], s) => `${+(x + s * nx).toFixed(3)} ${+(y + s * ny).toFixed(3)}`
  return `M${pt(a, 1)}L${pt(end, 1)}L${pt(end, -1)}L${pt(a, -1)}Z`
}
export const fill = ({ radius }) => {
  const [, a, b, c] = face
  const front = rounded(face, crisp(radius))
  return [
    solid(rounded(outer, crisp(radius))),
    cutout([slit(a, outer[2]), slit(b, outer[3]), slit(c, outer[4])]),
    clear(front, GAP),
    solid(front),
  ]
}
