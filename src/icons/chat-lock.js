import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { lock, visual } from '../symbols'
import { warning } from '../tone'

// 对话 + 锁
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...warning(lock(center, centerScale * visual.lock, radius)),
]
