import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { sparkle, visual } from '../symbols'
import { accent } from '../tone'

// 文件 + 星芒
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(sparkle(center, centerScale * visual.sparkle, radius)),
]
