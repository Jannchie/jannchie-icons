import { plain, center, centerScale } from '../briefcase'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 公文包 + 星芒
export default ({ radius }) => [
  ...plain(radius),
  ...accent(sparkle(center, centerScale, radius)),
]
