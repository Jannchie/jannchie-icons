import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, ring } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角圆
const k = cornerScale.ring

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.ring, badge, k), stroke), radius, false),
  flap(radius),
  ...accent(ring(badge, k, radius)),
]
