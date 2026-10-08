import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { check, visual } from '../symbols'
import { success } from '../tone'

// 对话 + 勾
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...success(check(center, centerScale * visual.check, radius)),
]
