import { glyph } from '../letters'

// 有序列表：左侧缩小的线条数字 1 2 3（标记为细节）+ 三行线
const rows = [6, 12, 18]
const scale = 0.6

export default () => [
  ...rows.map((y, i) => ({ d: glyph(String(i + 1), 3, y - 3 * scale, scale), detail: true })),
  ...rows.map(y => `M9 ${y}H21`),
]
