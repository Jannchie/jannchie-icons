import { glyph } from '../letters'
import { ring } from '../marks'

// 圆圈里的 6：线条字形放大 1.6 倍居中
const scale = 1.6
export default ({ radius }) => [
  ring(),
  glyph('6', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]
