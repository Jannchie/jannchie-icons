import { ring, square } from '../marks'
import { dot } from '../scene'

// 单选框（已选）：圆 + 中间实心点
export default ({ radius, stroke }) => [
  ring(),
  dot(12, 12, 7),
]
