import { glyph } from '../letters'
import { square } from '../marks'

// 方框里的 G：线条字形放大 1.8 倍居中
const scale = 1.8
export default ({ radius }) => [
  square(radius),
  glyph('G', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]
