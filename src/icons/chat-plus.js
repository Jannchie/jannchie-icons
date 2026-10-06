import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { plus } from '../symbols'

// 对话 + 加号
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...plus(center, 1, radius),
]
