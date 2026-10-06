import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { image } from '../symbols'

// 对话 + 图片
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...image(center, 1, radius),
]
