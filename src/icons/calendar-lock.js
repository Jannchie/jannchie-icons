import { base, center, centerScale } from '../calendar'
import { lock } from '../symbols'
import { warning } from '../tone'

// 日历 + 锁
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...warning(lock(center, centerScale, radius)),
]
