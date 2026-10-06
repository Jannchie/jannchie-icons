import { circle } from '../geometry'
import { dot } from '../scene'
import { crisp, rounded } from '../geometry'

// 天王星 ⛢：下方的圆（圆心一点）+ 从圆顶向上的箭头
export default ({ radius }) => [
  circle(12, 15, 5.5),
  dot(12, 15, 2.5),
  'M12 9.5V3',
  rounded([[9.5, 5.5], [12, 3], [14.5, 5.5]], crisp(radius), false),
]
