import { rounded } from '../geometry'
import { dot } from '../scene'

// 投屏：左下角开口的屏幕 + 以左下角为圆心的两道弧和一个点
export default ({ radius }) => [
  rounded([[3.5, 8.5], [3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [14.5, 19.5]], Math.min(radius, 2.5), false),
  'M3.5 10.5A9 9 0 0 1 12.5 19.5',
  'M3.5 14.5A5 5 0 0 1 8.5 19.5',
  dot(3.5, 19.5),
]
