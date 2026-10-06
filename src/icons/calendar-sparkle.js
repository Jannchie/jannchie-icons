import { base, center, centerScale } from '../calendar'
import { sparkle } from '../symbols'

// 日历 + 星芒
export default ({ radius }) => [
  ...base(radius),
  ...sparkle(center, centerScale, radius),
]
