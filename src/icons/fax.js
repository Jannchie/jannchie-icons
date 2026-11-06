import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 传真机：机身（8.5–21.5 × 9.5–20.5）+ 机身顶上伸出的纸（11.5–18.5，两条竖边垂直接在机身顶边上）+
// 左侧独立的竖放听筒（2.5–6.5 × 7.5–20.5）+ 机身里 2 × 3 的按键点
export default ({ radius }) => [
  rounded([[8.5, 9.5], [21.5, 9.5], [21.5, 20.5], [8.5, 20.5]], Math.min(radius, 2)),
  rounded([[11.5, 9.5], [11.5, 3.5], [18.5, 3.5], [18.5, 9.5]], Math.min(radius, 1), false),
  rounded([[2.5, 7.5], [6.5, 7.5], [6.5, 20.5], [2.5, 20.5]], Math.min(radius, 2)),
  ...[12, 15, 18].flatMap(x => [dot(x, 14), dot(x, 17)]),
]

// 实心：机身、纸、听筒各一块；纸和机身之间挖开一道缝（纸本来接在机身顶边上），按键点挖空
export const fill = ({ radius, stroke }) => [
  solid(rounded([[8.5, 9.5], [21.5, 9.5], [21.5, 20.5], [8.5, 20.5]], Math.min(radius, 2))),
  solid(rounded([[11.5, 9.5], [11.5, 3.5], [18.5, 3.5], [18.5, 9.5]], Math.min(radius, 1))),
  knock(`M11.5 ${9.5 - stroke}H18.5`),
  solid(rounded([[2.5, 7.5], [6.5, 7.5], [6.5, 20.5], [2.5, 20.5]], Math.min(radius, 2))),
  knock([12, 15, 18].flatMap(x => [dot(x, 14), dot(x, 17)])),
]
