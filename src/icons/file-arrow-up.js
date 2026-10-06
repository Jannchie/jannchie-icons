import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { arrowUp } from '../symbols'

// 文件 + 上箭头
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...arrowUp(center, 1, radius),
]
