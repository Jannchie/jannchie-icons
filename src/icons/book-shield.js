import { plain, center, centerScale } from '../book'
import { shield } from '../symbols'
import { success } from '../tone'

// 书 + 盾
export default ({ radius }) => [
  ...plain(radius),
  ...success(shield(center, centerScale, radius)),
]
