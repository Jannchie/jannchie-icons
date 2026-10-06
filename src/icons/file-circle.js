import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { ring } from '../symbols'

// 文件 + 圆
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...ring(center, 1, radius),
]
