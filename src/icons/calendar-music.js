import { base, center, centerScale } from '../calendar'
import { music } from '../symbols'
import { accent } from '../tone'

// 日历 + 音乐
export default ({ radius }) => [
  ...base(radius),
  ...accent(music(center, centerScale, radius)),
]
