import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { plus } from '../symbols'
import { success } from '../tone'

// 对话 + 加号
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...success(plus(center, 1, radius)),
]
