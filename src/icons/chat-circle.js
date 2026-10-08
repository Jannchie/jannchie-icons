import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { ring, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 圆
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(ring(center, centerScale * visual.ring, radius)),
]
