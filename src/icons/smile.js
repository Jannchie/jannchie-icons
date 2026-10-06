import { circle } from '../geometry'
import { dot } from '../scene'

// 表情：圆脸 + 两只眼睛 + 微笑弧
export default () => [
  circle(12, 12, 9),
  dot(9, 9.75),
  dot(15, 9.75),
  'M8.5 14.25A4 4 0 0 0 15.5 14.25',
]
