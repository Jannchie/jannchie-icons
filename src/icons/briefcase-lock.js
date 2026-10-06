import { plain, center, centerScale } from '../briefcase'
import { lock } from '../symbols'

// 公文包 + 锁
export default ({ radius }) => [
  ...plain(radius),
  ...lock(center, centerScale, radius),
]
