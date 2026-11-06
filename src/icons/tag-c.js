import { crispGlyph, LABEL } from '../letters'
import { knock } from '../solid'
import { tagHorizontal, tagHorizontalFill } from '../tag'

// 标签里的 C：切角标签字形放大 1.5 倍，放在标签方正部分的中间（x 14.5），横竖笔画对齐像素网格
const scale = 1.5
export default ({ radius, stroke }) => [
  ...tagHorizontal(stroke, radius),
  crispGlyph('C', 14.5 - 1.75 * scale, 12 - 3 * scale, scale, scale, LABEL),
]

// 实心：标签一块、穿孔挖空，字形从标签上挖掉
export const fill = ({ radius, stroke }) => [...tagHorizontalFill(stroke, radius), knock(crispGlyph('C', 14.5 - 1.75 * scale, 12 - 3 * scale, scale, scale, LABEL))]
