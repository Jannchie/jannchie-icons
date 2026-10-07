import { cart } from '../cart'

// 加入购物车：车筐里一个加号
export default ({ radius }) => [
  ...cart(radius),
  'M13.5 9.25V13.75',
  'M11.25 11.5H15.75',
]
