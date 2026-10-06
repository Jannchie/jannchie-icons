import { circle } from '../geometry'
import { glyph } from '../letters'
import { ring } from '../marks'

// 台球 8 号球：圆球 + 中间白色小圆 + 圈里的 8
export default ({ radius }) => [
  ring(),
  circle(12, 11, 4.25),
  { d: glyph('8', 10.25, 8, 1), thin: true },
]
