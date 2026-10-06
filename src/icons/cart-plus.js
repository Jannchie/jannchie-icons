import { cart } from '../cart'

// 加入购物车：车筐里一个加号
export default ({ radius }) => [
  ...cart(radius),
  'M13 9V13.5',
  'M10.75 11.25H15.25',
]
