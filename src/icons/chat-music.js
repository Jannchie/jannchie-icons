import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { music } from '../symbols'
import { accent } from '../tone'

// 对话 + 音乐
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(music(center, 1, radius)),
]
