import { bubble } from '../chat'
import { rounded } from '../geometry'

// 对话气泡
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
]
