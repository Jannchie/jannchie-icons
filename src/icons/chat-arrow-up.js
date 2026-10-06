import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { arrowUp } from '../symbols'

// 对话 + 上箭头
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...arrowUp(center, 1, radius),
]
