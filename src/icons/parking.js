import { rounded } from '../geometry'
import { glyph, snap } from '../letters'

// 停车：圆角方牌（3.5–20.5）+ 放大的线条字母 P（1.6 倍，居中，横竖笔画对齐像素网格）
const s = 1.6
export default ({ radius }) => [
  rounded([[3.5, 3.5], [20.5, 3.5], [20.5, 20.5], [3.5, 20.5]], radius),
  ...snap([glyph('P', 12 - 1.75 * s, 12 - 3 * s, s)]),
]
