import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { ban, visual } from '../symbols'
import { danger } from '../tone'

// 对话 + 禁止
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...danger(ban(center, centerScale * visual.ban, radius)),
]
