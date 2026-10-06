import { crisp, rounded } from '../geometry'

// 十面骰（d10）：上下尖、两侧略平的外轮廓 + 中间的风筝形正面 + 正面三个下顶点连到外轮廓的棱
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
