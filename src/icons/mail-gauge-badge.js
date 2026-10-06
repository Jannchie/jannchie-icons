import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, gauge, outlines } from '../symbols'

// 邮件 + 右下角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.gauge, badge, k), stroke), radius, false),
  flap(radius),
  ...gauge(badge, k, radius),
]
