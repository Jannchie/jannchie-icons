import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { arrowUp, cornerScale, outlines } from '../symbols'

// 对话 + 右下角上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.arrowUp, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...arrowUp(badge, k, radius),
]
