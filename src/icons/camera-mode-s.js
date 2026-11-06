import { circle } from '../geometry'
import { glyph } from '../letters'
import { knock, solid } from '../solid'

// 相机模式 S（快门优先）：模式转盘的圆 + 居中放大 1.6 倍的线条字母
const scale = 1.6
export default () => [
  circle(12, 12, 9),
  glyph('S', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]

// 实心：转盘一块，字母挖空
export const fill = () => [
  solid(circle(12, 12, 9)),
  knock(glyph('S', 12 - 1.75 * scale, 12 - 3 * scale, scale)),
]
