import { center, centerScale, plain } from '../monitor'
import { bookmark, visual } from '../symbols'
import { accent } from '../tone'

// 显示器 + 书签
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
]
