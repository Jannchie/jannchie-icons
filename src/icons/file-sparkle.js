import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 文件 + 星芒
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(sparkle(center, 1, radius)),
]
