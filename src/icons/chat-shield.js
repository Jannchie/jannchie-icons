import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { shield } from '../symbols'
import { success } from '../tone'

// 对话 + 盾
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...success(shield(center, 1, radius)),
]
