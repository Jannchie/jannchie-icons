import { place } from '../clearance'
import { aroundTop, badgeTop } from '../calendar'
import { cornerScale, gauge, outlines } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.gauge, badgeTop, k), radius, stroke),
  ...info(gauge(badgeTop, k, radius)),
]
