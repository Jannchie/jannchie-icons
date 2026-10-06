import { crisp, rounded } from '../geometry'

// 大于 >
export default ({ radius }) => [
  rounded([[7, 5], [17, 12], [7, 19]], crisp(radius), false),
]
