import { plain, center, centerScale } from '../monitor'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 显示器 + 书签
export default ({ radius }) => [
  ...plain(radius),
  ...accent(bookmark(center, centerScale, radius)),
]
