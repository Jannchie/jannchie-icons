import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 钱包：圆角机身 + 右侧卡扣口袋（与机身右边共用）+ 口袋上的圆点
export default ({ radius }) => [
  rounded([[3.5, 5], [20.5, 5], [20.5, 19], [3.5, 19]], Math.min(radius, 2.5)),
  rounded([[20.5, 10], [15.5, 10], [15.5, 14], [20.5, 14]], Math.min(radius, 1.5), false),
  dot(18, 12),
]

// 实心：机身一块，挖掉卡扣口袋的轮廓（口袋成了单独的一块），口袋上的圆点挖空
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 5], [20.5, 5], [20.5, 19], [3.5, 19]], Math.min(radius, 2.5))),
  knock([rounded([[20.5, 10], [15.5, 10], [15.5, 14], [20.5, 14]], Math.min(radius, 1.5), false), dot(18, 12)]),
]
