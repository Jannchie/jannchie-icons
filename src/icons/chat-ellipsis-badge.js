import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, ellipsis } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角省略号
const k = cornerScale.ellipsis

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.ellipsis, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...accent(ellipsis(badge, k, radius)),
]
