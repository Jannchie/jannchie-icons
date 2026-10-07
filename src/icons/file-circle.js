import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { ring } from '../symbols'
import { accent } from '../tone'

// 文件 + 圆
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...accent(ring(center, 1, radius)),
]
