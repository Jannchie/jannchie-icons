import { plain, center, centerScale } from '../book'
import { ring } from '../symbols'
import { accent } from '../tone'

// 书 + 圆
export default ({ radius }) => [
  ...plain(radius),
  ...accent(ring(center, centerScale, radius)),
]
