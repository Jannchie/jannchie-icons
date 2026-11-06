import { circle } from '../geometry'
import { ring } from '../marks'
import { eye } from '../scene'
import { hole, knock, solid } from '../solid'

// 惊讶：圆脸 + 两只眼睛 + 圆形的「O」嘴
export default () => [
  ring(),
  eye(9, 9.75),
  eye(15, 9.75),
  circle(12, 15.25, 2),
]

// 实心：脸一块，眼睛挖空，「O」嘴挖成洞
export const fill = () => [
  solid(ring()),
  knock([eye(9, 9.75), eye(15, 9.75)]),
  hole(circle(12, 15.25, 2)),
]
