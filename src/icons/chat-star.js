import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { star } from '../symbols'
import { warning } from '../tone'

// 对话 + 收藏
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...warning(star(center, 1, radius)),
]
