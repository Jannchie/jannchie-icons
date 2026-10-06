import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { cross } from '../symbols'

// 对话 + 叉
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...cross(center, 1, radius),
]
