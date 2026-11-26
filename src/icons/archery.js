import { circle } from '../geometry'
import { clear, knock, solid } from '../solid'

// 射箭：架在支架上的箭靶（靶面圆心 (10.5, 9.5)，外圈半径 7、内圈 3.5）+ 靶下往两边岔开的两条支腿
// + 从右边水平射进靶心的一支箭（箭杆到 19.5，箭尾两道 < 形的羽毛，后一道的尖就是箭杆的末端）。
// 和 darts（斜插的飞镖、没有支架）、bow（弓）区分开：靠支架和水平的带羽箭认出来
const arrow = ['M10.5 9.5H19.5', 'M19.5 8L18 9.5L19.5 11', 'M21 8L19.5 9.5L21 11']
const legs = ['M6.5 15.24L5 21', 'M14.5 15.24L16 21']

export default () => [
  { d: circle(10.5, 9.5, 7), cut: false },
  circle(10.5, 9.5, 3.5),
  ...legs,
  ...arrow.map(d => ({ d, cut: true, gap: 0.5 })),
]

// 实心：靶面一块，挖掉内圈；支腿照旧是线；箭四周让出 0.5 的缝（和描边版断开的间隙一样）再画回去
export const fill = () => [
  solid(circle(10.5, 9.5, 7)),
  knock(circle(10.5, 9.5, 3.5)),
  ...legs,
  clear(arrow, 0.5),
  ...arrow,
]
