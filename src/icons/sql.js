import { rounded } from '../geometry'
import { LABEL, line, snap } from '../letters'
import { knock, solid } from '../solid'

// SQL：和 gif、css、yaml、画质标识同一套横向圆角外框（2.5–21.5 × 5.5–18.5）+ 框里切角线条字母 SQL（字高 7.2，字宽压到 0.85，字距 2.5，同 quality.js）
// 标签字形的 Q 尾巴只在右下角切进去一点，缩到 16px 和 O 分不开、整个读成 SOL；
// 这里单独给 Q 一条长尾巴：从字心下方斜穿右下切角、伸出字格 .75，粗细字重下都看得出是 Q
const font = { ...LABEL, glyphs: { ...LABEL.glyphs, Q: 'M1 0H2.5L3.5 1V6L2.5 7H1L0 6V1ZM1.75 4.5L3.75 7.75' } }
const box = radius => rounded([[2.5, 5.5], [21.5, 5.5], [21.5, 18.5], [2.5, 18.5]], Math.min(radius, 2.5))
const letters = snap(line('SQL', [12, 12], 0.85, 2.5, 1.2, font)).map(d => ({ d, thin: true }))

export default ({ radius }) => [box(radius), ...letters]

// 实心：外框一块，字母挖空
export const fill = ({ radius }) => [solid(box(radius)), knock(letters)]
