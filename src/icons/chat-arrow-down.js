import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { arrowDown } from '../symbols'

// 对话 + 下箭头
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...arrowDown(center, 1, radius),
]
