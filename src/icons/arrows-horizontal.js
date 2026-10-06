import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 左右交换：上面向右、下面向左的箭头
export default ({ radius, stroke }) => [
  'M4 8H20',
  rounded(arrow(20, 8, 'right', 3.5), crisp(radius), false),
  'M20 16H4',
  rounded(arrow(4, 16, 'left', 3.5), crisp(radius), false),
]
