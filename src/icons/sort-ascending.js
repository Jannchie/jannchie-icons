import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 升序：向上箭头 + 由短到长的三行线
export default ({ radius }) => [
  'M6.5 20V4',
  rounded(arrow(6.5, 4, "up", 3), crisp(radius), false),
  'M12 6H15',
  'M12 12H18',
  'M12 18H21',
]
