import { crispGlyph } from '../letters'
import { glyphRing } from '../marks'

// 圆圈里的 5：线条字形放大 1.9 倍居中，横竖笔画对齐像素网格
const scale = 1.9
export default ({ radius, stroke }) => [
  glyphRing(stroke),
  crispGlyph('5', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]
