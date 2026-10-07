import { ring } from '../marks'
import { eye } from '../scene'

// 眨眼：圆脸 + 左眼（点）+ 右眼闭成一道短横 + 微笑弧
export default () => [
  ring(),
  eye(9, 9.75),
  'M13.5 9.5H16.5',
  'M8.5 14.25A4 4 0 0 0 15.5 14.25',
]
