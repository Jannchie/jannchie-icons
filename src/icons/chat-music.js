import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { music } from '../symbols'

// 对话 + 音乐
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...music(center, 1, radius),
]
