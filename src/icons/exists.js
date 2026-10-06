import { crisp, rounded } from '../geometry'

// 存在 ∃：反 E
export default ({ radius }) => [
  rounded([[5.5, 4.5], [18.5, 4.5], [18.5, 19.5], [5.5, 19.5]], crisp(radius), false),
  'M6.5 12H18.5',
]
