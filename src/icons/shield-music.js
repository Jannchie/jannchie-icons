import { center, centerScale, plain } from '../shield'
import { music } from '../symbols'
import { accent } from '../tone'

// 盾 + 音乐；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...accent(music(center, centerScale, radius)),
]
