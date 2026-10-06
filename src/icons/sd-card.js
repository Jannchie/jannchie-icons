import { rounded } from '../geometry'

// SD 卡：左上切角的卡身 + 顶部三根金手指
export default ({ radius }) => [
  rounded([[8, 3], [19, 3], [19, 21], [5, 21], [5, 6]], Math.min(radius, 1.5)),
  'M10 3V6.5',
  'M13 3V6.5',
  'M16 3V6.5',
]
