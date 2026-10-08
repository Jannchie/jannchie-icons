import { plain, center, centerScale } from '../book'
import { lock } from '../symbols'
import { warning } from '../tone'

// 书 + 锁
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...warning(lock(center, centerScale, radius)),
]
