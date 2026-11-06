import { dpad, dpadArrow } from '../controller'
import { knock, solid } from '../solid'

// 十字键：按下（对应的臂里一个朝外的小三角）
export default ({ radius, stroke }) => [
  dpad(radius, stroke),
  dpadArrow('down', radius),
]

// 实心：外形填实，挖出箭头
export const fill = ({ radius, stroke }) => [solid(dpad(radius, stroke)), knock(dpadArrow('down', radius))]
