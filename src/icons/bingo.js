import { circle } from '../geometry'
import { glyph } from '../letters'
import { ring } from '../marks'

// 宾果：球上的号码牌——圆球 + 中间一圈白底 + 圈里的数字
export default ({ radius }) => [
  ring(),
  circle(12, 12, 5),
  { d: glyph('7', 10.25, 9, 1), thin: true },
]
