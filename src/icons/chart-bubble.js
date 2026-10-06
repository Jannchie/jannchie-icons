import { circle, rounded } from '../geometry'

// 气泡图：坐标轴 + 三个大小不同的圆
export default ({ radius }) => [
  rounded([[3.5, 3.5], [3.5, 20.5], [20.5, 20.5]], Math.min(radius, 1), false),
  circle(9, 14.5, 2.5),
  circle(15, 8.5, 3.5),
  circle(17, 16.5, 1.5),
]
