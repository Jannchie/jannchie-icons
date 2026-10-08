import { center, centerScale, plain } from '../monitor'
import { music } from '../symbols'
import { accent } from '../tone'

// 显示器 + 音乐
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(music(center, centerScale, radius)),
]
