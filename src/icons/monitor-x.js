import { plain, center, centerScale } from '../monitor'
import { cross } from '../symbols'
import { danger } from '../tone'

// 显示器 + 叉
export default ({ radius }) => [
  ...plain(radius),
  ...danger(cross(center, centerScale, radius)),
]
