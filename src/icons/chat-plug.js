import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { plug, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 插头
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(plug(center, centerScale * visual.plug, radius)),
]
