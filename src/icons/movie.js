import { circle, crisp, rounded } from '../geometry'

// 胶片：外框 + 左右两条片孔带
export default ({ radius, stroke }) => [
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2)),
  'M7.5 3V21',
  'M16.5 3V21',
  'M3 7.5H7.5',
  'M3 12H7.5',
  'M3 16.5H7.5',
  'M16.5 7.5H21',
  'M16.5 12H21',
  'M16.5 16.5H21',
]
