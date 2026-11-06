import { circle } from '../geometry'
import { glyph, LABEL } from '../letters'
import { ring } from '../marks'
import { hole, solid } from '../solid'

// 台球 8 号球：圆球 + 中间白色小圆 + 圈里的 8
export default ({ radius }) => [
  ring(),
  circle(12, 11, 4.25),
  { d: glyph('8', 10.25, 8, 1, 1, LABEL), thin: true },
]

// 实心：黑色球体，中间的白圆整个挖空，8 画回白圆里
export const fill = () => [
  solid(ring()),
  hole(circle(12, 11, 4.25)),
  { d: glyph('8', 10.25, 8, 1, 1, LABEL), thin: true },
]
