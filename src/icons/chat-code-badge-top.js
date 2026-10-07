import { place } from '../clearance'
import { aroundTop, badgeTop } from '../chat'
import { code, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 对话 + 右上角代码
const k = cornerScale.code

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.code, badgeTop, k), radius, stroke),
  ...accent(code(badgeTop, k, radius)),
]
