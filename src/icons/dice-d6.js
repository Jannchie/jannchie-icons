import { crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 六面骰（d6，立体）：30° 等距视角的立方体（六边形外轮廓 + Y 形棱）+ 三个面上各一个点
const outer = [[12, 2.5], [20.25, 7.25], [20.25, 16.75], [12, 21.5], [3.75, 16.75], [3.75, 7.25]]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  'M3.75 7.25L12 12L20.25 7.25',
  'M12 12V21.5',
  dot(12, 7.25, 2.5),
  dot(7.9, 14.4, 2.5),
  dot(16.1, 14.4, 2.5),
]
