import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 登录：箭头从左边进入右侧的门框
export default ({ radius }) => [
  rounded([[14, 4], [19.5, 4], [19.5, 20], [14, 20]], Math.min(radius, 2), false),
  'M4 12H14',
  rounded(arrow(14, 12, "right", 3.5), crisp(radius), false),
]
