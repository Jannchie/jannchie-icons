import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, sparkle } from '../symbols'

// 对话 + 右下角星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.sparkle, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...sparkle(badge, k, radius),
]
