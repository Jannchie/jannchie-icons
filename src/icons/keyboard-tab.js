import { crisp, rounded } from '../geometry'

// Tab ⇥：向右的箭头顶到一道竖线；横线落在 12
export default ({ radius }) => [
  'M3.5 12H17',
  rounded([[13, 8], [17, 12], [13, 16]], crisp(radius), false),
  'M19.5 7V17',
]
