import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { ring, visual } from '../symbols'
import { accent } from '../tone'

// 文件 + 圆
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(ring(center, centerScale * visual.ring, radius)),
]
