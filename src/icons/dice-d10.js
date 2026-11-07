import { crisp, rounded, through } from '../geometry'
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

// 实心：外轮廓一块，挖掉风筝形正面的边和三条棱；三条棱的外端穿出外轮廓，骰子分成正面和四周的三块
export const fill = ({ radius, stroke }) => {
  const [, a, b, c] = face
  return [
    solid(rounded(outer, crisp(radius))),
    knock([
      rounded(face, crisp(radius)),
      through(a, outer[2], 0, 2 * stroke),
      through(b, outer[3], 0, 2 * stroke),
      through(c, outer[4], 0, 2 * stroke),
    ]),
  ]
}
