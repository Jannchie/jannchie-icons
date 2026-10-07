import { crisp, rounded } from '../geometry'

// 二十面骰（d20）：正六边形外轮廓 + 中间朝上的三角形正面 + 正面每个顶点连到附近三个外顶点的棱
// 棱线都接在外轮廓顶点上，所以外轮廓只用 crisp 小圆角
// 六边形整体右移半格、略压扁：中轴在 12.5，竖边在 4.5 / 20.5，侧顶点在 7.5 / 16.5（都在 .5 上）
const outer = [[12.5, 2.5], [20.5, 7.5], [20.5, 16.5], [12.5, 21.5], [4.5, 16.5], [4.5, 7.5]]
const [t, l, r] = [[12.5, 7.5], [8, 15.5], [17, 15.5]]
const edge = (a, b) => `M${a.join(' ')}L${b.join(' ')}`

export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded([t, r, l], crisp(radius)),
  edge(t, outer[0]), edge(t, outer[1]), edge(t, outer[5]),
  edge(l, outer[5]), edge(l, outer[4]), edge(l, outer[3]),
  edge(r, outer[1]), edge(r, outer[2]), edge(r, outer[3]),
]
