import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { arrowLeft, cornerScale, outlines } from '../symbols'

// 对话 + 右下角左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.arrowLeft, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...arrowLeft(badge, k, radius),
]
