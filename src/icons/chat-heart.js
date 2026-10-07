import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { heart } from '../symbols'
import { danger } from '../tone'

// 对话 + 爱心
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...danger(heart(center, 1, radius)),
]
