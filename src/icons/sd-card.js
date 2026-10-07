import { rounded } from '../geometry'

// SD 卡：左上切角的卡身 + 顶部三根金手指
export default ({ radius }) => [
  rounded([[8.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5], [5.5, 5.5]], Math.min(radius, 1.5)),
  'M10.5 2.5V6',
  'M13.5 2.5V6',
  'M16.5 2.5V6',
]
