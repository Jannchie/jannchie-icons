import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 导入：右侧开口朝左的方框 + 从左边伸进框里的箭头（整体上移、左移半格）
export default ({ radius, stroke }) => [
  rounded([[8.5, 7.5], [8.5, 3.5], [19.5, 3.5], [19.5, 19.5], [8.5, 19.5], [8.5, 15.5]], Math.min(radius, 2), false),
  'M3 11.5H14',
  rounded(arrow(14, 11.5, 'right', 3), crisp(radius), false),
]
