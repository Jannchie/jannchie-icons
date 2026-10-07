import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 导出：左侧开口朝右的方框 + 从框里伸出去的箭头（整体上移、右移半格）
export default ({ radius, stroke }) => [
  rounded([[15.5, 7.5], [15.5, 3.5], [4.5, 3.5], [4.5, 19.5], [15.5, 19.5], [15.5, 15.5]], Math.min(radius, 2), false),
  'M10 11.5H21',
  rounded(arrow(21, 11.5, 'right', 3), crisp(radius), false),
]
