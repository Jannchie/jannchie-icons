import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { lock } from '../symbols'
import { warning } from '../tone'

// 对话 + 锁
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...warning(lock(center, 1, radius)),
]
