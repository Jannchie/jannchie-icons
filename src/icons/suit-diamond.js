import { crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 扑克花色·方块
export default ({ radius }) => [
  rounded([[12, 2.5], [19, 12], [12, 21.5], [5, 12]], crisp(radius)),
]

// 实心：整块方块花色
export const fill = ({ radius }) => [solid(rounded([[12, 2.5], [19, 12], [12, 21.5], [5, 12]], crisp(radius)))]
