import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { bookmark } from '../symbols'

// 文件 + 书签
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...bookmark(center, 1, radius),
]
