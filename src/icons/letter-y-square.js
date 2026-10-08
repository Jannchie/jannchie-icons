import { crispGlyph } from '../letters'
import { glyphSquare } from '../marks'

// 方框里的 Y：线条字形放大 1.9 倍居中，横竖笔画对齐像素网格
const scale = 1.9
export default ({ radius, stroke }) => [
  glyphSquare(radius, stroke),
  crispGlyph('Y', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]
