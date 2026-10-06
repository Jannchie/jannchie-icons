import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { clock } from '../symbols'

// 对话 + 时钟
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...clock(center, 1, radius),
]
