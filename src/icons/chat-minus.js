import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { minus } from '../symbols'
import { danger } from '../tone'

// 对话 + 减号
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...danger(minus(center, 1, radius)),
]
