import { base, center, centerScale } from '../calendar'
import { star } from '../symbols'

// 日历 + 收藏
export default ({ radius }) => [
  ...base(radius),
  ...star(center, centerScale, radius),
]
