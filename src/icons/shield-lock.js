import { center, centerScale, plain } from '../shield'
import { lock } from '../symbols'
import { warning } from '../tone'

// 盾 + 锁；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...warning(lock(center, centerScale, radius)),
]
