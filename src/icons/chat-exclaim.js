import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { exclaim, visual } from '../symbols'
import { warning } from '../tone'

// 对话 + 感叹号
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...warning(exclaim(center, centerScale * visual.exclaim, radius)),
]
