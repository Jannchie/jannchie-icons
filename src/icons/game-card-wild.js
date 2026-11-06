import { card, cardFill } from '../game-card'
import { knock } from '../solid'

// 功能牌·万能：牌心被十字分成四格
export default ({ radius }) => [
  ...card(radius),
  { d: 'M12 7V17', thin: true },
  { d: 'M7.5 12H16.5', thin: true },
]

// 实心：牌面填实，挖出牌心和十字
export const fill = ({ radius }) => [
  ...cardFill(radius),
  knock([{ d: 'M12 7V17', thin: true }, { d: 'M7.5 12H16.5', thin: true }]),
]
