import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, plug } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角插头
const k = cornerScale.plug

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.plug, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...accent(plug(badge, k, radius)),
]
