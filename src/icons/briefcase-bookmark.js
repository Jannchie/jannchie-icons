import { plain, center, centerScale } from '../briefcase'
import { bookmark } from '../symbols'

// 公文包 + 书签
export default ({ radius }) => [
  ...plain(radius),
  ...bookmark(center, centerScale, radius),
]
