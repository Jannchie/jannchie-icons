import { plain, center, centerScale } from '../briefcase'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 公文包 + 书签
export default ({ radius }) => [
  ...plain(radius),
  ...accent(bookmark(center, centerScale, radius)),
]
