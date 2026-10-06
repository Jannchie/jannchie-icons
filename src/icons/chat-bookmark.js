import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { bookmark } from '../symbols'

// 对话 + 书签
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...bookmark(center, 1, radius),
]
