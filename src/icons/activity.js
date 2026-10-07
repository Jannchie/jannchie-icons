import { rounded } from '../geometry'

// 活动：心电图折线
export default ({ radius }) => [
  rounded([[2.5, 11.5], [6.5, 11.5], [9.5, 4], [14.5, 19], [17.5, 11.5], [21.5, 11.5]], Math.min(radius, 1), false),
]
