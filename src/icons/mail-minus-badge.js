import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, minus, outlines } from '../symbols'

// 邮件 + 右下角减号
const k = cornerScale.minus

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.minus, badge, k), stroke), radius, false),
  flap(radius),
  ...minus(badge, k, radius),
]
