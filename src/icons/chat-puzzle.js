import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 对话 + 拼图（模组）
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(puzzle(center, 1, radius)),
]
