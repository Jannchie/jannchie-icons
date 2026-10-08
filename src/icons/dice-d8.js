import { crisp, rounded } from '../geometry'

// 八面骰（d8）：正六边形外轮廓 + 交替连三个外顶点的三角形正面
// 六边形略压扁：中轴在 12，竖边在 4 / 20，侧顶点在 7.5 / 16.5
const outer = [[12, 2.5], [20, 7.5], [20, 16.5], [12, 21.5], [4, 16.5], [4, 7.5]]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded([outer[0], outer[2], outer[4]], crisp(radius)),
]
