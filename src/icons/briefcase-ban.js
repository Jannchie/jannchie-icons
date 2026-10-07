import { plain, center, centerScale } from '../briefcase'
import { ban } from '../symbols'
import { danger } from '../tone'

// 公文包 + 禁止
export default ({ radius }) => [
  ...plain(radius),
  ...danger(ban(center, centerScale, radius)),
]
