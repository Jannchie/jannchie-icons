import { rounded } from '../geometry'
import { bubble } from '../chat'

// 对话气泡
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
]
