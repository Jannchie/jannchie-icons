import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { plug } from '../symbols'

// 对话 + 插头
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...plug(center, 1, radius),
]
