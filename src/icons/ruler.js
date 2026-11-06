import { circle, crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'
import { mirror, rotate, scale } from '../transform'

// 尺子：竖直的长方块 + 左侧长短交替的刻度，再顺时针转 45°
export default ({ radius, stroke }) => [
  rotate(rounded([[8.5, 2.5], [15.5, 2.5], [15.5, 21.5], [8.5, 21.5]], Math.min(radius, 1.5)), 45),
  rotate('M8.5 6H10.5', 45),
  rotate('M8.5 9.5H11.5', 45),
  rotate('M8.5 13H10.5', 45),
  rotate('M8.5 16.5H11.5', 45),
]

// 实心：尺身一块，刻度挖空（从边上切进去的缺口）
export const fill = ({ radius }) => [
  solid(rotate(rounded([[8.5, 2.5], [15.5, 2.5], [15.5, 21.5], [8.5, 21.5]], Math.min(radius, 1.5)), 45)),
  knock(['M8.5 6H10.5', 'M8.5 9.5H11.5', 'M8.5 13H10.5', 'M8.5 16.5H11.5'].map(d => rotate(d, 45))),
]
