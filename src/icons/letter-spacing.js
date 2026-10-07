import { crisp, rounded } from '../geometry'
import { crispGlyph } from '../letters'

// 字间距：上面一个线条字母 A（1.4 倍，3.5–11.9 高），下面一根左右双向箭头（y 18.5，3.5–21.5）
const s = 1.4
export default ({ radius }) => [
  crispGlyph('A', 12.5 - 1.75 * s, 3.5, s),
  'M3.5 18.5H21.5',
  rounded([[5.5, 16.5], [3.5, 18.5], [5.5, 20.5]], crisp(radius), false),
  rounded([[19.5, 16.5], [21.5, 18.5], [19.5, 20.5]], crisp(radius), false),
]
