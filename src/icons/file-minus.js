import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { minus, visual } from '../symbols'
import { danger } from '../tone'

// 文件 + 减号
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...danger(minus(center, centerScale * visual.minus, radius)),
]
