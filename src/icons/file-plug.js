import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { plug } from '../symbols'
import { accent } from '../tone'

// 文件 + 插头
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(plug(center, 1, radius)),
]
