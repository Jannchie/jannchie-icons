import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 导出：左侧开口朝右的方框 + 从框里伸出去的箭头
export default ({ radius, stroke }) => [
  rounded([[15, 8], [15, 4], [4, 4], [4, 20], [15, 20], [15, 16]], Math.min(radius, 2), false),
  'M10 12H21',
  rounded(arrow(21, 12, 'right', 3), crisp(radius), false),
]
