import { card } from '../game-card'

// 功能牌·万能：牌心被十字分成四格
export default ({ radius }) => [
  ...card(radius),
  { d: 'M12 7V17', thin: true },
  { d: 'M7.5 12H16.5', thin: true },
]
