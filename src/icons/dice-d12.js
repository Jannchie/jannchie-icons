import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 十二面骰（d12）：正十边形外轮廓 + 中间尖朝上的正五边形正面 + 正面五个顶点各连到同方向的外顶点
// 中心在 (12, 12)；外轮廓半径取 9 / cos18°，左右两条竖边落在 3 / 21 上；
// 正面半径取 4.5 / sin54°，底边落在 16.5 上
const polar = (r, deg) => [12 + r * Math.cos(deg * Math.PI / 180), 12 + r * Math.sin(deg * Math.PI / 180)]
const outer = Array.from({ length: 10 }, (_, i) => polar(9 / Math.cos(Math.PI / 10), -90 + 36 * i))
const face = Array.from({ length: 5 }, (_, i) => polar(4.5 / Math.sin(0.3 * Math.PI), -90 + 72 * i))
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded(face, crisp(radius)),
  ...face.map((p, i) => `M${p.join(' ')}L${outer[i * 2].join(' ')}`),
]

// 线段 a→b，两端各缩 s0 / s1（碰到外轮廓的那头缩一个线宽，挖空时不把骰子切开）
const cut = ([ax, ay], [bx, by], s0, s1) => {
  const l = Math.hypot(bx - ax, by - ay)
  const [ux, uy] = [(bx - ax) / l, (by - ay) / l]
  return `M${ax + ux * s0} ${ay + uy * s0}L${bx - ux * s1} ${by - uy * s1}`
}

// 实心：十边形一块，挖掉正五边形正面和五条棱（外顶点那头缩一个线宽）
export const fill = ({ radius, stroke }) => [
  solid(rounded(outer, crisp(radius))),
  knock([rounded(face, crisp(radius)), ...face.map((p, i) => cut(p, outer[i * 2], 0, stroke))]),
]
