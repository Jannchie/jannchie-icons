import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { cross } from '../symbols'
import { danger } from '../tone'

// 文件 + 叉
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...danger(cross(center, 1, radius)),
]
