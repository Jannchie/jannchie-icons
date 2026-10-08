import { plain, center, centerScale } from '../book'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 书 + 书签
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(bookmark(center, centerScale, radius)),
]
