import { ring } from '../marks'
import { eye } from '../scene'
import { knock, solid } from '../solid'

// 生气：圆脸 + 往中间压下的两道眉 + 两只眼睛 + 往下撇的嘴
export default () => [
  ring(),
  'M7.5 7.5L10.5 9M16.5 7.5L13.5 9',
  eye(9, 11.25),
  eye(15, 11.25),
  'M9 17A3.5 3.5 0 0 1 15 17',
]

// 实心：脸一块，眉、眼睛、嘴挖空
export const fill = () => [
  solid(ring()),
  knock([
    'M7.5 7.5L10.5 9M16.5 7.5L13.5 9',
    eye(9, 11.25),
    eye(15, 11.25),
    'M9 17A3.5 3.5 0 0 1 15 17',
  ]),
]
