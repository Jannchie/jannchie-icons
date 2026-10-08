import { base, center, centerScale } from '../calendar'
import { cross } from '../symbols'
import { danger } from '../tone'

// 日历 + 叉
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...danger(cross(center, centerScale, radius)),
]
