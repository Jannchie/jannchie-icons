import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { arrowDown } from '../symbols'

// 文件 + 下箭头
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...arrowDown(center, 1, radius),
]
