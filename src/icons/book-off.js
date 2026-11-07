import { cover, fillParts, page, pageY } from '../book'
import { off, offFill } from '../off'
import { plainFill } from '../solid'

// 无书：页线只画到斜线经过的地方（斜线是 45° 的 y = x，与页线交在 x = 页线高度处），
// 免得斜线右边留下一小截页线头，和封面右边挤成一个小钩
export default off(({ stroke }) => [cover(stroke), page(stroke, pageY(stroke))])
// 实心版：封面和书页本来就是分开的两块（见 book.js 的 fillParts），斜线右边不会留下线头，用完整的书就行
export const fill = offFill(({ radius, stroke }) => plainFill(fillParts(radius, stroke)))
