import { plain, center, centerScale } from '../briefcase'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 公文包 + 书签
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(bookmark(center, centerScale, radius)),
]
