import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { ring } from '../symbols'
import { accent } from '../tone'

// 对话 + 圆
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(ring(center, 1, radius)),
]
