import { cart } from '../cart'

// 清空购物车：车筐里一个叉
export default ({ radius }) => [
  ...cart(radius),
  'M11.75 9.75L15.25 13.25',
  'M15.25 9.75L11.75 13.25',
]
