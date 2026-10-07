import { crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 登录：箭头从左边进入右侧的门框（整体上移半格）
export default ({ radius }) => [
  rounded([[14, 3.5], [19.5, 3.5], [19.5, 19.5], [14, 19.5]], Math.min(radius, 2), false),
  'M4 11.5H14',
  rounded(arrow(14, 11.5, "right", 3.5), crisp(radius), false),
]
