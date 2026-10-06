import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { arrowRight } from '../symbols'

// 文件 + 右箭头
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...arrowRight(center, 1, radius),
]
