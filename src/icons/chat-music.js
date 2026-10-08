import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { music, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 音乐
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(music(center, centerScale * visual.music, radius)),
]
