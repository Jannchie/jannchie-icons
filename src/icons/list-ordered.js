import { glyph, LABEL } from '../letters'

// 有序列表：左侧缩小的线条数字 1 2 3（细节、细线：粗字重下三个数字才不糊成一列）+ 三行线
// 和 list 同一套版式：三行 6 / 12 / 18 以画布中线对称；数字墨迹从 3 起（字宽 3.5 × 0.6 ≈ 2.1），行线墨迹 8–21，线宽变粗只往里长
const rows = [6, 12, 18]
const scale = 0.6

export default ({ stroke }) => [
  ...rows.map((y, i) => ({ d: glyph(String(i + 1), 3.5, y - 3 * scale, scale, scale, LABEL), detail: true, thin: true })),
  ...rows.map(y => `M${8 + stroke / 2} ${y}H${21 - stroke / 2}`),
]
