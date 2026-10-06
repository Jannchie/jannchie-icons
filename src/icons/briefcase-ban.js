import { plain, center, centerScale } from '../briefcase'
import { ban } from '../symbols'

// 公文包 + 禁止
export default ({ radius }) => [
  ...plain(radius),
  ...ban(center, centerScale, radius),
]
