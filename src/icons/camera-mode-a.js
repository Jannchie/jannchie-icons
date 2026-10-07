import { circle } from '../geometry'
import { glyph } from '../letters'

// 相机模式 A（光圈优先）：模式转盘的圆 + 居中放大 1.6 倍的线条字母
const scale = 1.6
export default () => [
  circle(12, 12, 9),
  // 上移 0.1，让横杠落在 y 13.5 上
  glyph('A', 12 - 1.75 * scale, 12 - 3 * scale - 0.1, scale),
]
