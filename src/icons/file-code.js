import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { code, visual } from '../symbols'
import { accent } from '../tone'

// 文件 + 代码
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(code(center, centerScale * visual.code, radius)),
]
