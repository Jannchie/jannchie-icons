import { rounded } from '../geometry'
import { dot } from '../scene'

// 区域：一块不规则的五边形边界 + 五个顶点上的方形手柄（编辑区域边界的样子）
// 左边是竖直的一条边，落在 x = 4.5；其余四条边都是斜的，五个顶点错落，不像正多边形
const pts = [[4.5, 6.5], [14, 3.5], [20.5, 10.5], [16, 20.5], [4.5, 16.5]]
export default ({ radius }) => [
  rounded(pts, Math.min(radius, 0.5)),
  ...pts.map(([x, y]) => dot(x, y, 3.5)),
]
