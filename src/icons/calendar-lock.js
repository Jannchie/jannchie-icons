import { base, center, centerScale } from '../calendar'
import { lock } from '../symbols'

// 日历 + 锁
export default ({ radius }) => [
  ...base(radius),
  ...lock(center, centerScale, radius),
]
