import { plain, center, centerScale } from '../briefcase'
import { cross, visual } from '../symbols'
import { danger } from '../tone'

// 公文包 + 叉
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]
