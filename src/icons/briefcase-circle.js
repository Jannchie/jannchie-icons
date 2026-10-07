import { plain, center, centerScale } from '../briefcase'
import { ring } from '../symbols'
import { accent } from '../tone'

// 公文包 + 圆
export default ({ radius }) => [
  ...plain(radius),
  ...accent(ring(center, centerScale, radius)),
]
