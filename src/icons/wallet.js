import { rounded } from '../geometry'
import { dot } from '../scene'

// 钱包：圆角机身 + 右侧卡扣口袋（与机身右边共用）+ 口袋上的圆点
export default ({ radius }) => [
  rounded([[3, 5.5], [21, 5.5], [21, 19.5], [3, 19.5]], Math.min(radius, 2.5)),
  rounded([[21, 10], [15.5, 10], [15.5, 15], [21, 15]], Math.min(radius, 1.5), false),
  dot(18, 12.5),
]
