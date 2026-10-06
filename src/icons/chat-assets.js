import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { assets } from '../symbols'

// 对话 + 素材
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...assets(center, 1, radius),
]
