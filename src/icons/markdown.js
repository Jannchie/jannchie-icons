import { frame } from '../geometry'
import { knock, solid } from '../solid'

// Markdown 标志：横长的圆角框（墨迹 3–21 × 6–18，线宽变粗往里长）+ 框里左边一个 M、右边一个朝下的箭头（都是缩小的细节线）
const box = (radius, stroke) => frame(stroke, Math.min(radius, 2), [3, 6, 21, 18])
const glyph = ['M6.5 14.5V9.5L9 12.5L11.5 9.5V14.5', 'M16 9.5V14.5', 'M13.75 12.25L16 14.5L18.25 12.25'].map(d => ({ d, detail: true }))

export default ({ radius, stroke }) => [box(radius, stroke), ...glyph]

// 实心：框一块，M 和箭头挖空
export const fill = ({ radius, stroke }) => [solid(box(radius, stroke)), knock(glyph)]
