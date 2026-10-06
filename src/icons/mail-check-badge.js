import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { check, cornerScale, outlines } from '../symbols'

// 邮件 + 右下角勾
const k = cornerScale.check

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.check, badge, k), stroke), radius, false),
  flap(radius),
  ...check(badge, k, radius),
]
