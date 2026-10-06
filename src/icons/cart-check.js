import { cart } from '../cart'
import { crisp, rounded } from '../geometry'

// 已加入购物车：车筐里一个勾
export default ({ radius }) => [
  ...cart(radius),
  rounded([[10.75, 11.25], [12.5, 13], [15.5, 10]], crisp(radius), false),
]
