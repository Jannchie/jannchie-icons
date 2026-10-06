import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { cross } from '../symbols'

// 文件 + 叉
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...cross(center, 1, radius),
]
