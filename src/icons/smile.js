import { circle } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 表情：圆脸 + 两只眼睛 + 微笑弧
export default () => [
  circle(12, 12, 9),
  eye(9, 9.75),
  eye(15, 9.75),
  'M8.5 14.25A4 4 0 0 0 15.5 14.25',
]

// 实心：脸一块，眼睛和嘴挖空
export const fill = () => [
  solid(circle(12, 12, 9)),
  knock([eye(9, 9.75), eye(15, 9.75), 'M8.5 14.25A4 4 0 0 0 15.5 14.25']),
]
