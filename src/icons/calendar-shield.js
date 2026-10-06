import { base, center, centerScale } from '../calendar'
import { shield } from '../symbols'

// 日历 + 盾
export default ({ radius }) => [
  ...base(radius),
  ...shield(center, centerScale, radius),
]
