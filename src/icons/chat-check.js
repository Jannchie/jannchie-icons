import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { check } from '../symbols'
import { success } from '../tone'

// 对话 + 勾
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...success(check(center, 1, radius)),
]
