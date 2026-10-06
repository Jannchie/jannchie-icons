import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, ring } from '../symbols'

// 对话 + 右下角圆
const k = cornerScale.ring

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.ring, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...ring(badge, k, radius),
]
