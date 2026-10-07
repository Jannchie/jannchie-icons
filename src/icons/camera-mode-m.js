import { circle } from '../geometry'
import { glyph } from '../letters'

// 相机模式 M（手动）：模式转盘的圆 + 居中放大 1.6 倍的线条字母
const scale = 1.6
// 横向收窄到字宽 5，两条竖笔落在 9.5 / 14.5 上
const sx = 10 / 7
export default () => [
  circle(12, 12, 9),
  glyph('M', 12 - 1.75 * sx, 12 - 3 * scale, sx, scale),
]
