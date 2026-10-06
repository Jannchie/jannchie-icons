import { base, center, centerScale } from '../calendar'
import { puzzle } from '../symbols'

// 日历 + 拼图（模组）
export default ({ radius }) => [
  ...base(radius),
  ...puzzle(center, centerScale, radius),
]
