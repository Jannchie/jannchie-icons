import { circle } from '../geometry'
import { ring } from '../marks'
import { eye } from '../scene'

// 惊讶：圆脸 + 两只眼睛 + 圆形的「O」嘴
export default () => [
  ring(),
  eye(9, 9.75),
  eye(15, 9.75),
  circle(12, 15.25, 2),
]
