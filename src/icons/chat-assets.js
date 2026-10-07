import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { assets } from '../symbols'
import { accent } from '../tone'

// 对话 + 素材
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(assets(center, 1, radius)),
]
