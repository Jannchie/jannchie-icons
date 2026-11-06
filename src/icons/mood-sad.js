import { ring } from '../marks'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 难过：圆脸 + 两只眼睛（同 mood-empty）+ 往下撇的弧
export default () => [
  ring(),
  eye(9, 9.75),
  eye(15, 9.75),
  'M8.5 16.75A4 4 0 0 1 15.5 16.75',
]

// 实心：脸一块，眼睛、嘴挖空
export const fill = () => [
  solid(ring()),
  knock([
    eye(9, 9.75),
    eye(15, 9.75),
    'M8.5 16.75A4 4 0 0 1 15.5 16.75',
  ]),
]
