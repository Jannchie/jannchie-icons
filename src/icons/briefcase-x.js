import { plain, center, centerScale } from '../briefcase'
import { cross } from '../symbols'
import { danger } from '../tone'

// 公文包 + 叉
export default ({ radius }) => [
  ...plain(radius),
  ...danger(cross(center, centerScale, radius)),
]
