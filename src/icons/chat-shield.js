import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { shield, visual } from '../symbols'
import { success } from '../tone'

// 对话 + 盾
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...success(shield(center, centerScale * visual.shield, radius)),
]
