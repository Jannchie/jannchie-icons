import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, gauge } from '../symbols'

// 日历 + 右下角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.gauge, badge, k), radius, stroke),
  ...gauge(badge, k, radius),
]
