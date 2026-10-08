import { plain, center, centerScale } from '../briefcase'
import { sparkle, visual } from '../symbols'
import { accent } from '../tone'

// 公文包 + 星芒
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(sparkle(center, centerScale * visual.sparkle, radius)),
]
