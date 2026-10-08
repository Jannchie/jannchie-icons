import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { gauge, visual } from '../symbols'
import { info } from '../tone'

// 对话 + 计速器
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(gauge(center, centerScale * visual.gauge, radius)),
]
