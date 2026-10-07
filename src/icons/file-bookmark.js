import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 文件 + 书签
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...accent(bookmark(center, 1, radius)),
]
