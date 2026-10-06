import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, sparkle } from '../symbols'

// 邮件 + 右下角星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.sparkle, badge, k), stroke), radius, false),
  flap(radius),
  ...sparkle(badge, k, radius),
]
