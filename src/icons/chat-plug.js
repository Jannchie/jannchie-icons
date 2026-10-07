import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { plug } from '../symbols'
import { accent } from '../tone'

// 对话 + 插头
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(plug(center, 1, radius)),
]
