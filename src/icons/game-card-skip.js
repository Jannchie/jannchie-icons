import { card, cardFill } from '../game-card'
import { circle } from '../geometry'
import { knock } from '../solid'

// 功能牌·跳过：牌心里一个禁止符号（圆 + 斜杠）
export default ({ radius }) => [
  ...card(radius),
  { d: circle(12, 12, 3), thin: true },
  { d: 'M9.88 9.88L14.12 14.12', thin: true },
]

// 实心：牌面填实，挖出牌心和禁止符号
export const fill = ({ radius }) => [
  ...cardFill(radius),
  knock([{ d: circle(12, 12, 3), thin: true }, { d: 'M9.88 9.88L14.12 14.12', thin: true }]),
]
