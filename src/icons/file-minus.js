import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { minus } from '../symbols'
import { danger } from '../tone'

// 文件 + 减号
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...danger(minus(center, 1, radius)),
]
