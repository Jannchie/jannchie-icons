import { ring } from '../marks'
import { eye } from '../scene'

// 难过：圆脸 + 两只眼睛（同 mood-empty）+ 往下撇的弧
export default () => [
  ring(),
  eye(9, 9.75),
  eye(15, 9.75),
  'M8.5 16.75A4 4 0 0 1 15.5 16.75',
]
