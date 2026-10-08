import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { code } from '../symbols'
import { accent } from '../tone'

// 文件 + 代码
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(code(center, 1, radius)),
]
