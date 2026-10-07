import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 上下交换：左边向上、右边向下的箭头
export default ({ radius }) => [
  'M7.5 20V4',
  rounded(arrow(7.5, 4, "up", 3.5), crisp(radius), false),
  'M16.5 4V20',
  rounded(arrow(16.5, 20, "down", 3.5), crisp(radius), false),
]
