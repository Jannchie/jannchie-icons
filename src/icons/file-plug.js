import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { plug, visual } from '../symbols'
import { accent } from '../tone'

// 文件 + 插头
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(plug(center, centerScale * visual.plug, radius)),
]
