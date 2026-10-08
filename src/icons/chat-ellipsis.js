import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { ellipsis, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 省略号
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(ellipsis(center, centerScale * visual.ellipsis, radius)),
]
