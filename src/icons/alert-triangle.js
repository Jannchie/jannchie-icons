import { rounded } from '../geometry'
import { dot } from '../scene'

// 警告：斜边与竖直成 30° 的三角 + 感叹号
export default ({ radius }) => [
  rounded([[12, 3.5], [21.5, 20], [2.5, 20]], Math.min(radius, 2.5)),
  'M12 9.5V14',
  dot(12, 17),
]
