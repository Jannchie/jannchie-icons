import { base, center, centerScale } from '../calendar'
import { clock } from '../symbols'

// 日历 + 时钟
export default ({ radius }) => [
  ...base(radius),
  ...clock(center, centerScale, radius),
]
