import { cart, fillParts } from '../cart'
import { plainFill } from '../solid'

// 购物车
export default ({ radius }) => [
  ...cart(radius),
]

// 实心：车筐、轮子填实，把手是线
export const fill = ({ radius }) => plainFill(fillParts(radius))
