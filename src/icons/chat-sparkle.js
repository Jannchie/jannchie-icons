import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 对话 + 星芒
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(sparkle(center, 1, radius)),
]
