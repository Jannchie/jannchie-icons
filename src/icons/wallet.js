import { rounded } from '../geometry'
import { dot } from '../scene'
import { knock, stacked } from '../solid'

// 钱包：圆角机身 + 右侧卡扣口袋（与机身右边共用）+ 口袋上的圆点
export default ({ radius }) => [
  rounded([[3.5, 5], [20.5, 5], [20.5, 19], [3.5, 19]], Math.min(radius, 2.5)),
  rounded([[20.5, 10], [15.5, 10], [15.5, 14], [20.5, 14]], Math.min(radius, 1.5), false),
  dot(18, 12),
]

// 实心：卡扣口袋在前、完整的一块，机身沿口袋让出 GAP 的缝（口袋右边和机身右边齐平，右侧两个角不倒圆），口袋上的圆点挖空。
// 不再挖一圈口袋的轮廓线：口袋只有 4 高，粗字重下线宽的缝把它啃得只剩一条细边
export const fill = ({ radius }) => {
  const k = Math.min(radius, 1.5)
  const tab = rounded([[20.5, 10, 0], [15.5, 10], [15.5, 14], [20.5, 14, 0]], k)
  return [...stacked(rounded([[3.5, 5], [20.5, 5], [20.5, 19], [3.5, 19]], Math.min(radius, 2.5)), tab), knock({ ...dot(18, 12), round: true })]
}
