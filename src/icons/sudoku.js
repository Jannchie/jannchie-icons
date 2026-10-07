import { rounded } from '../geometry'
import { glyph } from '../letters'

// 数独：九宫格（粗分区线 + 细格线）+ 几个填好的数字；格线落在 .5 上，三列宽 6 / 5 / 6
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 1.5)),
  'M9.5 3.5V20.5',
  'M14.5 3.5V20.5',
  'M3.5 9.5H20.5',
  'M3.5 14.5H20.5',
  { d: glyph('5', 5.25, 4.25, 0.75), thin: true },
  { d: glyph('3', 16.25, 9.75, 0.75), thin: true },
  { d: glyph('8', 10.75, 15.25, 0.75), thin: true },
]
