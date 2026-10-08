import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { arrowUp, visual } from '../symbols'
import { info } from '../tone'

// 对话 + 上箭头
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(arrowUp(center, centerScale * visual.arrowUp, radius)),
]
