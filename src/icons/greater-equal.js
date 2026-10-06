import { crisp, rounded } from '../geometry'

// 大于等于 ≥
export default ({ radius }) => [
  rounded([[7, 4], [17, 9.5], [7, 15]], crisp(radius), false),
  'M7 19.5H17',
]
