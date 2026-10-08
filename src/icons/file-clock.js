import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { clock, visual } from '../symbols'
import { info } from '../tone'

// 文件 + 时钟
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(clock(center, centerScale * visual.clock, radius)),
]
