import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { star } from '../symbols'

// 对话 + 收藏
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...star(center, 1, radius),
]
