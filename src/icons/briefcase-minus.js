import { plain, center, centerScale } from '../briefcase'
import { minus } from '../symbols'
import { danger } from '../tone'

// 公文包 + 减号
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(minus(center, centerScale, radius)),
]
