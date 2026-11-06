import { cart, fillParts } from '../cart'
import { centerFill } from '../solid'

// 移出购物车：车筐里一个减号
export default ({ radius }) => [
  ...cart(radius),
  'M11.25 11.5H15.75',
]

// 实心：车筐填实，减号挖空
export const fill = ({ radius }) => centerFill(fillParts(radius), ['M11.25 11.5H15.75'])
