import { circle, rounded } from '../geometry'
import { dot } from '../scene'

// 纸币：长方形 + 中间一个圆 + 左右两个点
export default ({ radius }) => [
  rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 17.5], [2.5, 17.5]], Math.min(radius, 2)),
  circle(12, 12, 2.75),
  dot(6, 12),
  dot(18, 12),
]
