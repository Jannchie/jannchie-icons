import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 列表循环：上下两段折线首尾相追
export default ({ radius }) => [
  rounded([[4, 12], [4, 7], [20, 7]], radius, false),
  rounded(arrow(20, 7, 'right'), crisp(radius), false),
  rounded([[20, 12], [20, 17], [4, 17]], radius, false),
  rounded(arrow(4, 17, 'left'), crisp(radius), false),
]
