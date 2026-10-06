import { plain, center, centerScale } from '../briefcase'
import { cross } from '../symbols'

// 公文包 + 叉
export default ({ radius }) => [
  ...plain(radius),
  ...cross(center, centerScale, radius),
]
