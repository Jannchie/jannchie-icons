import { crisp, rounded } from '../geometry'

// 二十面骰（d20）：正六边形外轮廓 + 中间朝上的三角形正面 + 正面每个顶点连到附近三个外顶点的棱
// 棱线都接在外轮廓顶点上，所以外轮廓只用 crisp 小圆角
const outer = [[12, 2.5], [20.25, 7.25], [20.25, 16.75], [12, 21.5], [3.75, 16.75], [3.75, 7.25]]
const [t, l, r] = [[12, 7.5], [7.5, 15.25], [16.5, 15.25]]
const edge = (a, b) => `M${a.join(' ')}L${b.join(' ')}`

export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded([t, r, l], crisp(radius)),
  edge(t, outer[0]), edge(t, outer[1]), edge(t, outer[5]),
  edge(l, outer[5]), edge(l, outer[4]), edge(l, outer[3]),
  edge(r, outer[1]), edge(r, outer[2]), edge(r, outer[3]),
]
