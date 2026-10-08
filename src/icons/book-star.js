import { plain, center, centerScale } from '../book'
import { star } from '../symbols'
import { warning } from '../tone'

// 书 + 收藏
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...warning(star(center, centerScale, radius)),
]
