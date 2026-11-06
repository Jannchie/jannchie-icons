import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// HDMI 接口：下方两角斜切的梯形外壳 + 中间的触点条
export default ({ radius }) => [
  rounded([[3.5, 8.5], [20.5, 8.5], [20.5, 13], [18, 15.5], [6, 15.5], [3.5, 13]], Math.min(radius, 1)),
  'M7 11.5H17',
]

// 实心：外壳一块，挖掉触点条
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 8.5], [20.5, 8.5], [20.5, 13], [18, 15.5], [6, 15.5], [3.5, 13]], Math.min(radius, 1))),
  knock('M7 11.5H17'),
]
