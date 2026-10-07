import { crisp, rounded } from '../geometry'

// Tab ⇥：向右的箭头顶到一道竖线；横线落在 12.5（箭杆是单线，放在 .5 上要整体下移半格）
export default ({ radius }) => [
  'M3.5 12.5H17',
  rounded([[13, 8.5], [17, 12.5], [13, 16.5]], crisp(radius), false),
  'M19.5 7.5V17.5',
]
