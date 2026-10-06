import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { minus } from '../symbols'

// 对话 + 减号
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...minus(center, 1, radius),
]
