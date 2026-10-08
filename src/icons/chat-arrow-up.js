import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { arrowUp } from '../symbols'
import { info } from '../tone'

// 对话 + 上箭头
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(arrowUp(center, 1, radius)),
]
