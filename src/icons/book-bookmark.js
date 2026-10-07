import { plain, center, centerScale } from '../book'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 书 + 书签
export default ({ radius }) => [
  ...plain(radius),
  ...accent(bookmark(center, centerScale, radius)),
]
