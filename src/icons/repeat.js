import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 列表循环：上下两段折线首尾相追
export default ({ radius }) => [
  rounded([[4.5, 12], [4.5, 6.5], [19.5, 6.5]], radius, false),
  rounded(arrow(19.5, 6.5, 'right'), crisp(radius), false),
  rounded([[19.5, 12], [19.5, 17.5], [4.5, 17.5]], radius, false),
  rounded(arrow(4.5, 17.5, 'left'), crisp(radius), false),
]
