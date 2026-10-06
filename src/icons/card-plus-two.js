import { card } from '../game-card'
import { glyph } from '../letters'

// 功能牌 +2：牌心里一个加号 + 数字 2
export default ({ radius }) => [
  ...card(radius),
  { d: 'M9 10V14', thin: true },
  { d: 'M7 12H11', thin: true },
  { d: glyph('2', 12, 9, 0.85), thin: true },
]
