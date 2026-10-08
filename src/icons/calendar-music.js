import { base, center, centerScale } from '../calendar'
import { music, visual } from '../symbols'
import { accent } from '../tone'

// 日历 + 音乐
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(music(center, centerScale * visual.music, radius)),
]
