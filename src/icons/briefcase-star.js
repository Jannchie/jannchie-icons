import { plain, center, centerScale } from '../briefcase'
import { star } from '../symbols'
import { warning } from '../tone'

// 公文包 + 收藏
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...warning(star(center, centerScale, radius)),
]
