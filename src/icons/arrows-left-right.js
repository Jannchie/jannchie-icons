import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 左右交换：上面向右、下面向左的箭头
export default ({ radius, stroke }) => [
  'M4 7.5H20',
  rounded(arrow(20, 7.5, 'right', 3.5), crisp(radius), false),
  'M20 16.5H4',
  rounded(arrow(4, 16.5, 'left', 3.5), crisp(radius), false),
]
