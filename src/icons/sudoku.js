import { rounded } from '../geometry'
import { glyph } from '../letters'

// 数独：九宫格（粗分区线 + 细格线）+ 几个填好的数字
export default ({ radius }) => [
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 1.5)),
  'M9 3V21',
  'M15 3V21',
  'M3 9H21',
  'M3 15H21',
  { d: glyph('5', 4.75, 4, 0.75), thin: true },
  { d: glyph('3', 16.75, 10, 0.75), thin: true },
  { d: glyph('8', 10.75, 16, 0.75), thin: true },
]
