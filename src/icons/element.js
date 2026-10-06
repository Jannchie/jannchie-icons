import { rounded } from '../geometry'
import { glyph } from '../letters'

// 元素周期表格子：圆角方块 + 左上的原子序数 + 中间的元素符号
export default ({ radius }) => [
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5)),
  { d: glyph('1', 5.5, 5.25, 0.6), thin: true },
  glyph('H', 9.4, 8, 1.5),
]
