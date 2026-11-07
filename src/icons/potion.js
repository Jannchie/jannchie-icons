import { rounded } from '../geometry'
import { knock, stacked } from '../solid'

// 药水：圆底瓶（圆心 (12, 14.75)、半径 6.25）+ 瓶颈 + 软木塞 + 液面
const [cx, cy, r] = [12, 14.75, 6.25]
const [nl, nr] = [10.5, 13.5] // 瓶颈两边
const f = v => +v.toFixed(3)
const shoulder = f(cy - Math.sqrt(r * r - (cx - nl) ** 2)) // 瓶颈和瓶身的交点
const bottle = `M${nl} 5.5V${shoulder}A${r} ${r} 0 1 0 ${nr} ${shoulder}V5.5`
const cork = radius => rounded([[9.5, 3.5], [14.5, 3.5], [14.5, 5.5], [9.5, 5.5]], Math.min(radius, 1))
// 液面两端落在瓶身圆上
const level = 14.5
const half = f(Math.sqrt(r * r - (level - cy) ** 2))
const liquid = `M${f(cx - half)} ${level}H${f(cx + half)}`

export default ({ radius }) => [bottle, cork(radius), liquid]

// 实心：软木塞在前、完整的一块，瓶子沿木塞让出 GAP 的缝（木塞四个角都是自己的圆角，不被一道缝切平）；
// 液面挖空，两端穿出瓶身 1.5（停在瓶身中心线上时圆头只擦到外缘，留一层发丝）
export const fill = ({ radius }) => [
  ...stacked(`${bottle}Z`, cork(radius)),
  knock(`M${f(cx - half - 1.5)} ${level}H${f(cx + half + 1.5)}`),
]
