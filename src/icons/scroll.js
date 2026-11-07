import { rounded } from '../geometry'
import { knock, stacked } from '../solid'

// 卷轴（设定集、世界书）：上下两根卷轴杆（两端圆头，比纸面宽）+ 中间的纸面 + 两行字
// 卷轴杆本来就是圆柱，圆头不跟随圆角设置
const rod = y => rounded([[4, y - 1.5], [20, y - 1.5], [20, y + 1.5], [4, y + 1.5]], 1.5)
const [top, bottom] = [5, 19]
const lines = ['M9.5 10.5H14.5', 'M9.5 13.5H14.5']

export default () => [rod(top), rod(bottom), `M6.5 ${top + 1.5}V${bottom - 1.5}`, `M17.5 ${top + 1.5}V${bottom - 1.5}`, ...lines]

// 实心：两根卷轴杆在前、各是完整的一块，纸面沿杆让出 GAP 的缝（和描边版一样读作杆压在纸上，而不是连成一个工字）；纸面挖掉两行字
export const fill = () => [
  ...stacked(`M6.5 ${top + 1.5}H17.5V${bottom - 1.5}H6.5Z`, rod(top), rod(bottom)),
  knock(lines),
]
