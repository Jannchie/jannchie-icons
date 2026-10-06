import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { ban } from '../symbols'

// 对话 + 禁止
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...ban(center, 1, radius),
]
