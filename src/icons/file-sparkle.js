import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { sparkle } from '../symbols'

// 文件 + 星芒
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...sparkle(center, 1, radius),
]
