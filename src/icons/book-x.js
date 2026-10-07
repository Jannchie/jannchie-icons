import { plain, center, centerScale } from '../book'
import { cross } from '../symbols'
import { danger } from '../tone'

// 书 + 叉
export default ({ radius }) => [
  ...plain(radius),
  ...danger(cross(center, centerScale, radius)),
]
