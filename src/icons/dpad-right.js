import { dpad, dpadArrow } from '../controller'

// 十字键：按右（对应的臂里一个朝外的小三角）
export default ({ radius }) => [
  dpad(radius),
  dpadArrow('right', radius),
]
