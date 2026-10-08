import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { cross, visual } from '../symbols'
import { danger } from '../tone'

// 对话 + 叉
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]
