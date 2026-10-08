import { plain, center, centerScale } from '../briefcase'
import { heart } from '../symbols'
import { danger } from '../tone'

// 公文包 + 爱心
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(heart(center, centerScale, radius)),
]
