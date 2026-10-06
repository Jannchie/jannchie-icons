import { crisp, rounded } from '../geometry'

// 任意 ∀：倒 A
export default ({ radius }) => [
  rounded([[4.5, 4.5], [12, 19.5], [19.5, 4.5]], crisp(radius), false),
  'M7.5 10.5H16.5',
]
