import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 降序：向下箭头 + 由长到短的三行线
export default ({ radius }) => [
  'M6.5 4V20',
  rounded(arrow(6.5, 20, "down", 3), crisp(radius), false),
  'M12 6H21',
  'M12 12H18',
  'M12 18H15',
]
