import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { plus, visual } from '../symbols'
import { success } from '../tone'

// 文件 + 加号
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...success(plus(center, centerScale * visual.plus, radius)),
]
