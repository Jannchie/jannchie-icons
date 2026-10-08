import { rounded } from '../geometry'
import { dot } from '../scene'

// 警告：斜边与竖直成 30° 的三角 + 感叹号
export default ({ radius }) => [
  rounded([[12, 3], [21.5, 19.5], [2.5, 19.5]], Math.min(radius, 2.5)),
  'M12 9V13.5',
  dot(12, 16.5),
]
