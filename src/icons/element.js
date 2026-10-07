import { rounded } from '../geometry'
import { glyph, LABEL } from '../letters'

// 元素周期表格子：圆角方块 + 左上的原子序数 + 中间的元素符号
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], Math.min(radius, 2.5)),
  { d: glyph('1', 5.5, 5.25, 0.6, 0.6, LABEL), thin: true },
  // 横向按 10/7 放大（字宽 5），两条竖笔落在 9.5 / 14.5 上
  glyph('H', 9.5, 8, 10 / 7, 1.5, LABEL),
]
