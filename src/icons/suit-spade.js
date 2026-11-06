import { solid } from '../solid'
import { SPADE } from '../suits'

// 扑克花色·黑桃
export default ({ radius }) => [
  SPADE,
]

// 实心：整块填实
export const fill = () => [solid(SPADE)]
