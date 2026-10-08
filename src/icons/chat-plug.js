import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { plug } from '../symbols'
import { accent } from '../tone'

// 对话 + 插头
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(plug(center, 1, radius)),
]
