import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { clock } from '../symbols'
import { info } from '../tone'

// 对话 + 时钟
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...info(clock(center, 1, radius)),
]
