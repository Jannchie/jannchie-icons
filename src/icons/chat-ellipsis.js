import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { ellipsis } from '../symbols'
import { accent } from '../tone'

// 对话 + 省略号
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(ellipsis(center, 1, radius)),
]
