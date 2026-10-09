import { dpad, dpadArrow } from '../controller'

// 十字键：按下（对应的臂里一个朝外的小三角）
export default ({ radius, stroke }) => [
  dpad(radius, stroke),
  dpadArrow('down', radius),
]
