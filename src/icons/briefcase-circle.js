import { plain, center, centerScale } from '../briefcase'
import { ring, visual } from '../symbols'
import { accent } from '../tone'

// 公文包 + 圆
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(ring(center, centerScale * visual.ring, radius)),
]
