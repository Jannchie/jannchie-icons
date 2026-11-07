import { rounded } from '../geometry'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 长笛：笛管（宽 4）+ 左端吹孔 + 一排小按孔（直径 1.5）；横着画再顺时针转 45°（\ 方向）——管窄了按孔会粘在管壁上
export default ({ radius }) => [
  rotate(rounded([[2.5, 10], [21.5, 10], [21.5, 14], [2.5, 14]], Math.min(radius, 2)), 45),
  { d: rotate('M5.5 12h0', 45), dot: 1.5 },
  { d: rotate('M10 12h0', 45), dot: 1.5 },
  { d: rotate('M12.75 12h0', 45), dot: 1.5 },
  { d: rotate('M15.5 12h0', 45), dot: 1.5 },
  { d: rotate('M18.25 12h0', 45), dot: 1.5 },
]

// 实心：笛管一块，吹孔和按孔挖空；孔按 eye 封顶大小、尖角模式下也是圆孔，粗字重下孔才不连成一串
export const fill = ({ radius }) => [
  solid(rotate(rounded([[2.5, 10], [21.5, 10], [21.5, 14], [2.5, 14]], Math.min(radius, 2)), 45)),
  knock([5.5, 10, 12.75, 15.5, 18.25].map(x => ({ d: rotate(`M${x} 12h0`, 45), dot: 1.5, eye: true, round: true }))),
]
