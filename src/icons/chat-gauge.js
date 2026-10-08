import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { gauge } from '../symbols'
import { info } from '../tone'

// 对话 + 计速器
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(gauge(center, 1, radius)),
]
