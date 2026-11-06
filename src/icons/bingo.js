import { circle } from '../geometry'
import { glyph, LABEL } from '../letters'
import { ring } from '../marks'
import { hole, solid } from '../solid'

// 宾果：球上的号码牌——圆球 + 中间一圈白底 + 圈里的数字
export default ({ radius }) => [
  ring(),
  circle(12, 12, 5),
  { d: glyph('7', 10.25, 9, 1, 1, LABEL), thin: true },
]

// 实心：球体一块，中间的白底整个挖空，数字画回白底里
export const fill = () => [
  solid(ring()),
  hole(circle(12, 12, 5)),
  { d: glyph('7', 10.25, 9, 1, 1, LABEL), thin: true },
]
