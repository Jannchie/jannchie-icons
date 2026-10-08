import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { minus, visual } from '../symbols'
import { danger } from '../tone'

// 对话 + 减号
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...danger(minus(center, centerScale * visual.minus, radius)),
]
