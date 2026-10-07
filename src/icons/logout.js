import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 登出：箭头从左侧门框往右出去（整体上移半格）
export default ({ radius }) => [
  rounded([[10, 3.5], [4.5, 3.5], [4.5, 19.5], [10, 19.5]], Math.min(radius, 2), false),
  'M10 11.5H20',
  rounded(arrow(20, 11.5, "right", 3.5), crisp(radius), false),
]
