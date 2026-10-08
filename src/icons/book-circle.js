import { plain, center, centerScale } from '../book'
import { ring } from '../symbols'
import { accent } from '../tone'

// 书 + 圆
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(ring(center, centerScale, radius)),
]
