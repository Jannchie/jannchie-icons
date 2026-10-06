import { rounded } from '../geometry'

// 活动：心电图折线
export default ({ radius }) => [
  rounded([[2.5, 12], [6.5, 12], [9.5, 4.5], [14.5, 19.5], [17.5, 12], [21.5, 12]], Math.min(radius, 1), false),
]
