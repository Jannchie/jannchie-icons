import { plain, center, centerScale } from '../book'
import { bookmark, visual } from '../symbols'
import { accent } from '../tone'

// 书 + 书签
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
]
