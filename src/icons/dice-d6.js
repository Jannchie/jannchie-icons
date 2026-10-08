import { crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 六面骰（d6，立体）：30° 等距视角的立方体（六边形外轮廓 + Y 形棱）+ 三个面上各一个点
// 六边形略压扁：中轴在 12，竖边在 4 / 20，侧顶点在 7.5 / 16.5
const outer = [[12, 2.5], [20, 7.5], [20, 16.5], [12, 21.5], [4, 16.5], [4, 7.5]]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  'M4 7.5L12 12.5L20 7.5',
  'M12 12.5V21.5',
  dot(12, 7.5, 2.5),
  dot(8, 14.5, 2.5),
  dot(16, 14.5, 2.5),
]
