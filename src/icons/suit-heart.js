import { solid } from '../solid'
import { HEART } from '../suits'

// 扑克花色·红心
export default ({ radius }) => [
  HEART,
]

// 实心：整块填实
export const fill = () => [solid(HEART)]
