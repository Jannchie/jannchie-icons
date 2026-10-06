import { plain, center, centerScale } from '../briefcase'
import { shield } from '../symbols'

// 公文包 + 盾
export default ({ radius }) => [
  ...plain(radius),
  ...shield(center, centerScale, radius),
]
