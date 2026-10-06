import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { arrowDown, cornerScale, outlines } from '../symbols'

// 对话 + 右下角下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.arrowDown, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...arrowDown(badge, k, radius),
]
