import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { arrowDown } from '../symbols'
import { info } from '../tone'

// 对话 + 下箭头
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(arrowDown(center, 1, radius)),
]
