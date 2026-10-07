import { rounded } from '../geometry'
import { dot } from '../scene'

// 警告：斜边与竖直成 30° 的三角 + 感叹号（整体右移半格，感叹号和底边落在 .5 上）
export default ({ radius }) => [
  rounded([[12.5, 3], [22, 19.5], [3, 19.5]], Math.min(radius, 2.5)),
  'M12.5 9V13.5',
  dot(12.5, 16.5),
]
