import { rounded } from '../geometry'
import { knock, solid } from '../solid'

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

// 实心：瓶子一块、软木塞一块，中间挖开一道缝；液面挖空
export const fill = ({ radius }) => [
  solid(`${bottle}Z`),
  solid(cork(radius)),
  knock(['M8.5 5.5H15.5', liquid]),
]
