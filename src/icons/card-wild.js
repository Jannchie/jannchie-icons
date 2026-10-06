import { card } from '../game-card'

// 功能牌·万能：牌心被十字分成四格
export default ({ radius }) => [
  ...card(radius),
  { d: 'M12 6.5V17.5', thin: true },
  { d: 'M7 12H17', thin: true },
]
