import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 降序：向下箭头 + 由长到短的三行线
export default ({ radius }) => [
  'M6.5 4V20',
  rounded(arrow(6.5, 20, "down", 3), crisp(radius), false),
  'M12 5.5H21',
  'M12 11.5H18',
  'M12 17.5H15',
]
