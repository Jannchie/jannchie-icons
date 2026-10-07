import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { code, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角代码
const k = cornerScale.code

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.code, badge, k), stroke, radius), radius, false),
  flap,
  ...accent(code(badge, k, radius)),
]
