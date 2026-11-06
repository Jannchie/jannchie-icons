import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

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

// 线段 a→b，两端各缩 s0 / s1（碰到外轮廓的那头缩一个线宽，挖空时不把骰子切开）
const cut = ([ax, ay], [bx, by], s0, s1) => {
  const l = Math.hypot(bx - ax, by - ay)
  const [ux, uy] = [(bx - ax) / l, (by - ay) / l]
  return `M${ax + ux * s0} ${ay + uy * s0}L${bx - ux * s1} ${by - uy * s1}`
}

// 实心：外轮廓一块，挖掉风筝形正面和三条棱；正面的上顶点、三条棱的外端都在外轮廓上，那头缩一个线宽
export const fill = ({ radius, stroke }) => {
  const [top, a, b, c] = face
  const s0 = cut(top, a, stroke, 0).split('L')[0]
  const s1 = cut(c, top, 0, stroke).split('L')[1]
  return [
    solid(rounded(outer, crisp(radius))),
    knock([
      `${s0}L${a.join(' ')}L${b.join(' ')}L${c.join(' ')}L${s1}`,
      cut(a, outer[2], 0, stroke),
      cut(b, outer[3], 0, stroke),
      cut(c, outer[4], 0, stroke),
    ]),
  ]
}
