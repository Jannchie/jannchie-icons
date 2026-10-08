import { crispGlyph, LABEL } from '../letters'
import { tagHorizontal } from '../tag'

// 标签里的 L：切角标签字形放大 1.5 倍，放在标签方正部分的中间（x 14.5），横竖笔画对齐像素网格
const scale = 1.5
export default ({ radius, stroke }) => [
  ...tagHorizontal(stroke, radius),
  crispGlyph('L', 14.5 - 1.75 * scale, 12 - 3 * scale, scale, scale, LABEL),
]
