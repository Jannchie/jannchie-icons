import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { minus } from '../symbols'

// 文件 + 减号
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...minus(center, 1, radius),
]
