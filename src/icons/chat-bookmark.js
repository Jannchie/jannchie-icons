import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 对话 + 书签
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...accent(bookmark(center, 1, radius)),
]
