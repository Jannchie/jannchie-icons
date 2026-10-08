import { off } from '../off'
import { cover, page, pageY } from '../book'

// 无书：页线只画到斜线经过的地方（斜线是 45° 的 y = x，与页线交在 x = 页线高度处），
// 免得斜线右边留下一小截页线头，和封面右边挤成一个小钩
export default off(({ stroke }) => [cover(stroke), page(stroke, pageY(stroke))])
