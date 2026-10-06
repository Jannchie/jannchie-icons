import { glyph } from '../letters'

// O：线条字形放大 2.5 倍居中
const scale = 2.5
export default ({ radius }) => [
  glyph('O', 12 - 1.75 * scale, 12 - 3 * scale, scale),
]
