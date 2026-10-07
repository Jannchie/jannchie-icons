import { place } from '../clearance'
import { aroundTop, badgeTop } from '../calendar'
import { code, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角代码
const k = cornerScale.code

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.code, badgeTop, k), radius, stroke),
  ...accent(code(badgeTop, k, radius)),
]
