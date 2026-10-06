import { crisp, rounded } from '../geometry'

// 小于 <
export default ({ radius }) => [
  rounded([[17, 5], [7, 12], [17, 19]], crisp(radius), false),
]
