import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { ring } from '../symbols'

// 对话 + 圆
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...ring(center, 1, radius),
]
