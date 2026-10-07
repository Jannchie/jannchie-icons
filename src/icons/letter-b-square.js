import { crispGlyph } from '../letters'
import { square } from '../marks'

// 方框里的 B：线条字形放大 1.8 倍居中，横竖笔画对齐像素网格
const scale = 1.8
export default ({ radius }) => [
  square(radius),
  crispGlyph('B', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]
