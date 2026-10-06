import { plain, center, centerScale } from '../briefcase'
import { star } from '../symbols'

// 公文包 + 收藏
export default ({ radius }) => [
  ...plain(radius),
  ...star(center, centerScale, radius),
]
