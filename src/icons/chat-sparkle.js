import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { sparkle, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 星芒
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(sparkle(center, centerScale * visual.sparkle, radius)),
]
