import { center, centerScale, plain } from '../monitor'
import { cross } from '../symbols'
import { danger } from '../tone'

// 显示器 + 叉
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(cross(center, centerScale, radius)),
]
