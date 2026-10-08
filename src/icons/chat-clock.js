import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { clock, visual } from '../symbols'
import { info } from '../tone'

// 对话 + 时钟
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(clock(center, centerScale * visual.clock, radius)),
]
