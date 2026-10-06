import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 登出：箭头从左侧门框往右出去
export default ({ radius }) => [
  rounded([[10, 4], [4.5, 4], [4.5, 20], [10, 20]], Math.min(radius, 2), false),
  'M10 12H20',
  rounded(arrow(20, 12, "right", 3.5), crisp(radius), false),
]
