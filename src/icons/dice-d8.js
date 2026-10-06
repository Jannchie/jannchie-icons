import { crisp, rounded } from '../geometry'

// 八面骰（d8）：正六边形外轮廓 + 交替连三个外顶点的三角形正面
const outer = [[12, 2.5], [20.25, 7.25], [20.25, 16.75], [12, 21.5], [3.75, 16.75], [3.75, 7.25]]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded([outer[0], outer[2], outer[4]], crisp(radius)),
]
