import { card } from '../game-card'
import { crisp, rounded } from '../geometry'

// 功能牌·反转：牌心里两道方向相反的折返箭头
export default ({ radius }) => [
  ...card(radius),
  { d: 'M9 13.5V10.5H14.5', thin: true },
  { d: rounded([[13, 9], [14.5, 10.5], [13, 12]], crisp(radius), false), thin: true },
  { d: 'M15 10.5V13.5H9.5', thin: true },
  { d: rounded([[11, 12], [9.5, 13.5], [11, 15]], crisp(radius), false), thin: true },
]
