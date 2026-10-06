import { base, center, centerScale } from '../calendar'
import { minus } from '../symbols'

// 日历 + 减号
export default ({ radius }) => [
  ...base(radius),
  ...minus(center, centerScale, radius),
]
