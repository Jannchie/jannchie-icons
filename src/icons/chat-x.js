import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { cross } from '../symbols'
import { danger } from '../tone'

// 对话 + 叉
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...danger(cross(center, 1, radius)),
]
