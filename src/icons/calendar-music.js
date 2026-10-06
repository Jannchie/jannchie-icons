import { base, center, centerScale } from '../calendar'
import { music } from '../symbols'

// 日历 + 音乐
export default ({ radius }) => [
  ...base(radius),
  ...music(center, centerScale, radius),
]
