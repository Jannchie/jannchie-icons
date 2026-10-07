import { cart } from '../cart'

// 移出购物车：车筐里一个减号
export default ({ radius }) => [
  ...cart(radius),
  'M11.25 11.5H15.75',
]
