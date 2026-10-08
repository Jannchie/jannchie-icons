import { crisp, rounded } from '../geometry'
import { crispGlyph, LABEL } from '../letters'
import { arrow } from '../media'

// 按字母升序：左边和 sort-ascending / sort-descending 同一根向下箭头（杆 6.5、箭翼 3），
// 右边上 A 下 Z 两个标签字形（切角字形，横向 10/7 倍、纵向 7/6 倍：5 × 7），A 在 3.5–10.5、Z 在 13.5–20.5，上下隔 3；
// 竖画 14.5 / 19.5、横画 3.5 / 10.5 / 13.5 / 20.5 都落在 .5 上（A 的中横由 snap 吸到网格）
export const sortLetters = (top, bottom) => [
  crispGlyph(top, 14.5, 3.5, 10 / 7, 7 / 6, LABEL),
  crispGlyph(bottom, 14.5, 13.5, 10 / 7, 7 / 6, LABEL),
]

export default ({ radius }) => [
  'M6.5 4V20',
  rounded(arrow(6.5, 20, 'down', 3), crisp(radius), false),
  ...sortLetters('A', 'Z'),
]
