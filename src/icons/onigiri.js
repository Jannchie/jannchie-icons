import { rounded } from '../geometry'

// 饭团：大圆角三角 + 底部的海苔
export default ({ radius }) => [
  rounded([[12, 3.5], [21, 19.5], [3, 19.5]], 4),
  rounded([[9, 19.5], [9, 14], [15, 14], [15, 19.5]], Math.min(radius, 1), false),
]
