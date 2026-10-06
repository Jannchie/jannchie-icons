import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { star } from '../symbols'

// 文件 + 收藏
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...star(center, 1, radius),
]
