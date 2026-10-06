import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, gauge, outlines } from '../symbols'

// 对话 + 右下角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.gauge, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...gauge(badge, k, radius),
]
