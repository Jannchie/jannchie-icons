import { plain, center, centerScale } from '../book'
import { cross } from '../symbols'
import { danger } from '../tone'

// 书 + 叉
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(cross(center, centerScale, radius)),
]
