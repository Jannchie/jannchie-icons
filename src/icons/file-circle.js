import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { ring } from '../symbols'
import { accent } from '../tone'

// 文件 + 圆
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(ring(center, 1, radius)),
]
