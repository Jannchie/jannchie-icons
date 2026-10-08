import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { code, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 代码
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(code(center, centerScale * visual.code, radius)),
]
