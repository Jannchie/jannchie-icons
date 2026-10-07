import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 对话 + 拼图（模组）
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(puzzle(center, 1, radius)),
]
