import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, gauge, outlines } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.gauge, badge, k), stroke), radius, false),
  flap(radius),
  ...info(gauge(badge, k, radius)),
]
