import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { arrowLeft } from '../symbols'

// 对话 + 左箭头
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...arrowLeft(center, 1, radius),
]
