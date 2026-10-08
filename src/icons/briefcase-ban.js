import { plain, center, centerScale } from '../briefcase'
import { ban } from '../symbols'
import { danger } from '../tone'

// 公文包 + 禁止
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...danger(ban(center, centerScale, radius)),
]
