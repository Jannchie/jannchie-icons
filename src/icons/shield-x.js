import { center, centerScale, plain } from '../shield'
import { cross, visual } from '../symbols'
import { danger } from '../tone'

// 盾 + 叉；盾下半收窄，符号放在中心偏上
export default ({ radius, stroke }) => [
  ...plain(stroke),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]
