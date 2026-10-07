import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { code } from '../symbols'
import { accent } from '../tone'

// 对话 + 代码
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(code(center, 1, radius)),
]
