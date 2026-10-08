import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { star, visual } from '../symbols'
import { warning } from '../tone'

// 对话 + 收藏
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...warning(star(center, centerScale * visual.star, radius)),
]
