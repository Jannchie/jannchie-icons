import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { dot, eye } from '../scene'
import { clear, cutout, knock, solid } from '../solid'

// 传真机：机身（8.5–21.5 × 9.5–20.5）+ 机身顶上伸出的纸（11.5–18.5，两条竖边垂直接在机身顶边上）+
// 左侧独立的竖放听筒（2.5–6.5 × 7.5–20.5）+ 机身里 2 × 3 的按键点
export default ({ radius }) => [
  rounded([[8.5, 9.5], [21.5, 9.5], [21.5, 20.5], [8.5, 20.5]], Math.min(radius, 2)),
  rounded([[11.5, 9.5], [11.5, 3.5], [18.5, 3.5], [18.5, 9.5]], Math.min(radius, 1), false),
  rounded([[2.5, 7.5], [6.5, 7.5], [6.5, 20.5], [2.5, 20.5]], Math.min(radius, 2)),
  ...[12, 15, 18].flatMap(x => [dot(x, 14), dot(x, 17)]),
]

// 实心：机身、纸、听筒各一块。纸和机身之间挖开一道 GAP 的横缝：缝的下沿就是机身顶边的外缘，左右伸出纸的两侧，
// 纸的底边和机身顶边都是完整的直边（不用两头带线帽的横线去挖，线帽停在纸的竖边上只擦到外缘）；
// 听筒在前，机身在它四周让出缝（粗字重下两者的墨迹本来贴在一起）；按键点挖空，尖角模式下也用圆点，不连成格子
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  const handset = rounded([[2.5, 7.5], [6.5, 7.5], [6.5, 20.5], [2.5, 20.5]], Math.min(radius, 2))
  return [
    solid(rounded([[8.5, 9.5], [21.5, 9.5], [21.5, 20.5], [8.5, 20.5]], Math.min(radius, 2))),
    solid(rounded([[11.5, 9.5], [11.5, 3.5], [18.5, 3.5], [18.5, 9.5]], Math.min(radius, 1))),
    cutout(`M10 ${9.5 - h - GAP}H20V${9.5 - h}H10Z`),
    knock([12, 15, 18].flatMap(x => [eye(x, 14), eye(x, 17)])),
    clear(handset, GAP),
    solid(handset),
  ]
}
