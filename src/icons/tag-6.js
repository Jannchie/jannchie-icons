import { crispGlyph } from '../letters'
import { tagShape } from '../marks'

// 标签里的 6：线条字形放大 1.5 倍，放在标签方正部分的中间（x 14.5），横竖笔画对齐像素网格
const scale = 1.5
export default ({ radius }) => [
  ...tagShape(radius),
  crispGlyph('6', 14.5 - 1.75 * scale, 12 - 3 * scale, scale),
]
