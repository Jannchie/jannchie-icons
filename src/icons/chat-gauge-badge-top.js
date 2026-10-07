import { place } from '../clearance'
import { aroundTop, badgeTop } from '../chat'
import { cornerScale, gauge, outlines } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.gauge, badgeTop, k), radius, stroke),
  ...info(gauge(badgeTop, k, radius)),
]
