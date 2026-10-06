import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { puzzle } from '../symbols'

// 对话 + 拼图（模组）
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...puzzle(center, 1, radius),
]
