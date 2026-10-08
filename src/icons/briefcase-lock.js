import { plain, center, centerScale } from '../briefcase'
import { lock, visual } from '../symbols'
import { warning } from '../tone'

// 公文包 + 锁
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...warning(lock(center, centerScale * visual.lock, radius)),
]
