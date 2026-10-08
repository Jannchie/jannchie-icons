import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { arrowDown, visual } from '../symbols'
import { info } from '../tone'

// 对话 + 下箭头
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(arrowDown(center, centerScale * visual.arrowDown, radius)),
]
