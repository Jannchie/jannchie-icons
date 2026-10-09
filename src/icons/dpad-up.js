import { dpad, dpadArrow } from '../controller'

// 十字键：按上（对应的臂里一个朝外的小三角）
export default ({ radius, stroke }) => [
  dpad(radius, stroke),
  dpadArrow('up', radius),
]
