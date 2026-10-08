import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { cross, visual } from '../symbols'
import { danger } from '../tone'

// 文件 + 叉
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...danger(cross(center, centerScale * visual.cross, radius)),
]
