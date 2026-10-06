import { rounded } from '../geometry'
import { dot } from '../scene'

// 散点图：坐标轴 + 直径 2.75 的实心点（点的大小独立于线宽）
export default ({ radius }) => [
  rounded([[3.5, 3.5], [3.5, 20.5], [20.5, 20.5]], Math.min(radius, 1), false),
  ...[[8, 15.5], [11, 10], [14, 14], [17, 7], [18, 16]].map(([x, y]) => dot(x, y, 2.75)),
]
