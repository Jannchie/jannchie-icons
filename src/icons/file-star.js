import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { star } from '../symbols'
import { warning } from '../tone'

// 文件 + 收藏
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...warning(star(center, 1, radius)),
]
