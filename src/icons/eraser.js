import { rounded } from '../geometry'
import { knock, solid } from '../solid'
import { rotate } from '../transform'

// 橡皮擦：9 × 16 的胖方块 + 中间一道分隔线，先竖直画，再顺时针转 30°
export default ({ radius }) => [
  rotate(rounded([[7.5, 4], [16.5, 4], [16.5, 20], [7.5, 20]], Math.min(radius, 2)), 30),
  rotate('M7.5 13L16.5 13', 30),
]

// 实心：橡皮一块，挖掉中间的分隔线（分成上下两截）；分隔线两端横着穿出两侧（停在侧边中线上的线帽只擦到外缘，留一道细桥）
export const fill = ({ radius, stroke }) => [
  solid(rotate(rounded([[7.5, 4], [16.5, 4], [16.5, 20], [7.5, 20]], Math.min(radius, 2)), 30)),
  knock(rotate(`M${7.5 - stroke} 13H${16.5 + stroke}`, 30)),
]
