import { cart, fillParts } from '../cart'
import { crisp, rounded } from '../geometry'
import { centerFill } from '../solid'

// 已加入购物车：车筐里一个勾
export default ({ radius }) => [
  ...cart(radius),
  rounded([[11.25, 11.5], [13, 13.25], [16, 10.25]], crisp(radius), false),
]

// 实心：车筐填实，勾挖空
export const fill = ({ radius }) => centerFill(fillParts(radius), [rounded([[11.25, 11.5], [13, 13.25], [16, 10.25]], crisp(radius), false)])
