import { circle, crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 胶片：外框 + 左右两条片孔带；片孔带分四格、每格高 4（外框 17 × 16，居中）
export default ({ radius, stroke }) => [
  rounded([[3.5, 4], [20.5, 4], [20.5, 20], [3.5, 20]], Math.min(radius, 2)),
  'M7.5 4V20',
  'M16.5 4V20',
  'M3.5 8H7.5',
  'M3.5 12H7.5',
  'M3.5 16H7.5',
  'M16.5 8H20.5',
  'M16.5 12H20.5',
  'M16.5 16H20.5',
]

// 实心：外框一块，挖掉两条片孔带的竖线（两端各缩一个线宽，画面和片孔带上下还连着）和片孔格线（外端缩一个线宽，留住外框边）
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3.5, 4], [20.5, 4], [20.5, 20], [3.5, 20]], Math.min(radius, 2))),
  knock([
    `M7.5 ${4 + stroke}V${20 - stroke}`,
    `M16.5 ${4 + stroke}V${20 - stroke}`,
    ...[8, 12, 16].flatMap(y => [`M${3.5 + stroke} ${y}H7.5`, `M16.5 ${y}H${20.5 - stroke}`]),
  ]),
]
