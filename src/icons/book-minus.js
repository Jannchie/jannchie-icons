import { plain, center, centerScale } from '../book'
import { minus } from '../symbols'
import { danger } from '../tone'

// 书 + 减号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(minus(center, centerScale, radius)),
]
