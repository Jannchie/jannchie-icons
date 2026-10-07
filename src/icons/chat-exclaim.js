import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { exclaim } from '../symbols'
import { warning } from '../tone'

// 对话 + 感叹号
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...warning(exclaim(center, 1, radius)),
]
