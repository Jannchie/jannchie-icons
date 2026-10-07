import { crispGlyph } from '../letters'

// 4：线条字形放大 2.5 倍居中，横竖笔画对齐像素网格
const scale = 2.5
export default ({ radius }) => [
  crispGlyph('4', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]
