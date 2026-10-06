import { cart } from '../cart'

// 移出购物车：车筐里一个减号
export default ({ radius }) => [
  ...cart(radius),
  'M10.75 11.25H15.25',
]
