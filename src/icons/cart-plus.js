import { cart, fillParts } from '../cart'
import { centerFill } from '../solid'

// 加入购物车：车筐里一个加号
export default ({ radius }) => [
  ...cart(radius),
  'M13.5 9.25V13.75',
  'M11.25 11.5H15.75',
]

// 实心：车筐填实，加号挖空
export const fill = ({ radius }) => centerFill(fillParts(radius), ['M13.5 9.25V13.75', 'M11.25 11.5H15.75'])
