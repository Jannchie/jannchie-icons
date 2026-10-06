import { crisp, rounded } from '../geometry'

// 小于等于 ≤
export default ({ radius }) => [
  rounded([[17, 4], [7, 9.5], [17, 15]], crisp(radius), false),
  'M7 19.5H17',
]
