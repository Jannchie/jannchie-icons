import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { lock } from '../symbols'

// 对话 + 锁
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...lock(center, 1, radius),
]
