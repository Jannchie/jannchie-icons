import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { sparkle } from '../symbols'

// 对话 + 星芒
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...sparkle(center, 1, radius),
]
