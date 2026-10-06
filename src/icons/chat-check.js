import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { check } from '../symbols'

// 对话 + 勾
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...check(center, 1, radius),
]
