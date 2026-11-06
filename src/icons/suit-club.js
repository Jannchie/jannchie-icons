import { solid } from '../solid'
import { CLUB } from '../suits'

// 扑克花色·梅花
export default ({ radius }) => [
  CLUB,
]

// 实心：整块填实
export const fill = () => [solid(CLUB)]
