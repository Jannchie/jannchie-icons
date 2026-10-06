import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { shield } from '../symbols'

// 对话 + 盾
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...shield(center, 1, radius),
]
