import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { clock, cornerScale, outlines } from '../symbols'

// 邮件 + 右下角时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.clock, badge, k), stroke), radius, false),
  flap(radius),
  ...clock(badge, k, radius),
]
