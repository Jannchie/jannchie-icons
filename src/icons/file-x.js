import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { cross } from '../symbols'
import { danger } from '../tone'

// 文件 + 叉
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...danger(cross(center, 1, radius)),
]
