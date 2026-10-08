import { center, centerScale, plain } from '../monitor'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 显示器 + 书签
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(bookmark(center, centerScale, radius)),
]
