import { circle } from '../geometry'
import { dot } from '../scene'

// 太阳 ☉：圆 + 圆心一点
export default ({ radius }) => [
  circle(12, 12, 8.5),
  dot(12, 12, 3),
]
