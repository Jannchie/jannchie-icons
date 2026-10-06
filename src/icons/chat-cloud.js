import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { cloud } from '../symbols'

// 对话 + 云
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...cloud(center, 1, radius),
]
