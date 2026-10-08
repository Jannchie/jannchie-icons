import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { arrowLeft } from '../symbols'
import { info } from '../tone'

// 对话 + 左箭头
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(arrowLeft(center, 1, radius)),
]
