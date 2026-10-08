import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { plus, visual } from '../symbols'
import { success } from '../tone'

// 对话 + 加号
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...success(plus(center, centerScale * visual.plus, radius)),
]
