import { crisp, rounded } from '../geometry'

// 扑克花色·方块
export default ({ radius }) => [
  rounded([[12, 2.5], [19, 12], [12, 21.5], [5, 12]], crisp(radius)),
]
