import { circle, rounded } from '../geometry'
import { dot } from '../scene'

// 显卡：左边挡板 + 卡身 + 两个风扇（圆 + 轴心）+ 底部金手指
export default ({ radius }) => [
  'M2.5 4.5V19.5',
  rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 16.5], [2.5, 16.5]], Math.min(radius, 1.5)),
  circle(8.5, 11.5, 3),
  dot(8.5, 11.5),
  circle(16, 11.5, 3),
  dot(16, 11.5),
  'M8.5 16.5V19.5H16.5V16.5',
]
