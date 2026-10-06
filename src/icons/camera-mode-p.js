import { circle } from '../geometry'
import { glyph } from '../letters'

// 相机模式 P（程序自动）：模式转盘的圆 + 居中放大 1.6 倍的线条字母
const scale = 1.6
export default () => [
  circle(12, 12, 9),
  glyph('P', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]
