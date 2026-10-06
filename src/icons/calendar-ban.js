import { base, center, centerScale } from '../calendar'
import { ban } from '../symbols'

// 日历 + 禁止
export default ({ radius }) => [
  ...base(radius),
  ...ban(center, centerScale, radius),
]
