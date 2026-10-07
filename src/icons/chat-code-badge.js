import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { code, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角代码
const k = cornerScale.code

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.code, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...accent(code(badge, k, radius)),
]
