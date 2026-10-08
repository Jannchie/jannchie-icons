import { base, center, centerScale } from '../calendar'
import { lock, visual } from '../symbols'
import { warning } from '../tone'

// 日历 + 锁
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...warning(lock(center, centerScale * visual.lock, radius)),
]
