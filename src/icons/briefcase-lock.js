import { plain, center, centerScale } from '../briefcase'
import { lock } from '../symbols'
import { warning } from '../tone'

// 公文包 + 锁
export default ({ radius }) => [
  ...plain(radius),
  ...warning(lock(center, centerScale, radius)),
]
