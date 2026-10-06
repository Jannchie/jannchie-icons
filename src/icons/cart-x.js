import { cart } from '../cart'

// 清空购物车：车筐里一个叉
export default ({ radius }) => [
  ...cart(radius),
  'M11.25 9.5L14.75 13',
  'M14.75 9.5L11.25 13',
]
