import { ring, square } from '../marks'
import { eye } from '../scene'

// 无表情：圆脸 + 两只眼睛 + 一字嘴
export default ({ radius, stroke }) => [
  ring(),
  eye(9, 9.75),
  eye(15, 9.75),
  'M8.5 15.5H15.5',
]
