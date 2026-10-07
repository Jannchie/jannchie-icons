import { crisp, rounded } from '../geometry'

// 八面骰（d8）：正六边形外轮廓 + 交替连三个外顶点的三角形正面
// 六边形整体右移半格、略压扁：中轴在 12.5，竖边在 4.5 / 20.5，侧顶点在 7.5 / 16.5（都在 .5 上）
const outer = [[12.5, 2.5], [20.5, 7.5], [20.5, 16.5], [12.5, 21.5], [4.5, 16.5], [4.5, 7.5]]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded([outer[0], outer[2], outer[4]], crisp(radius)),
]
