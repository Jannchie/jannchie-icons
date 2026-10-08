import { base, center, centerScale } from '../calendar'
import { cross, visual } from '../symbols'
import { danger } from '../tone'

// 日历 + 叉
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]
