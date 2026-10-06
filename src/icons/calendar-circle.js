import { base, center, centerScale } from '../calendar'
import { ring } from '../symbols'

// 日历 + 圆
export default ({ radius }) => [
  ...base(radius),
  ...ring(center, centerScale, radius),
]
