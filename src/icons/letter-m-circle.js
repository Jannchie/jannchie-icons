import { crispGlyph } from '../letters'
import { ring } from '../marks'

// 圆圈里的 M：线条字形放大 1.6 倍居中，横竖笔画对齐像素网格
const scale = 1.6
export default ({ radius }) => [
  ring(),
  crispGlyph('M', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]
