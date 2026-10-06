import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 导入：右侧开口朝左的方框 + 从左边伸进框里的箭头
export default ({ radius, stroke }) => [
  rounded([[9, 8], [9, 4], [20, 4], [20, 20], [9, 20], [9, 16]], Math.min(radius, 2), false),
  'M3 12H14',
  rounded(arrow(14, 12, 'right', 3), crisp(radius), false),
]
