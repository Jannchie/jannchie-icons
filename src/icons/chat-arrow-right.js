import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { arrowRight } from '../symbols'

// 对话 + 右箭头
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...arrowRight(center, 1, radius),
]
