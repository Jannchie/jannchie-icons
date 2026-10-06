import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { code } from '../symbols'

// 对话 + 代码
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...code(center, 1, radius),
]
