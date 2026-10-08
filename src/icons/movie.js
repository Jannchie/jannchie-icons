import { circle, crisp, rounded } from '../geometry'

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
