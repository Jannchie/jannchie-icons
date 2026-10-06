import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { arrowLeft, cornerScale, outlines } from '../symbols'

// 邮件 + 右下角左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.arrowLeft, badge, k), stroke), radius, false),
  flap(radius),
  ...arrowLeft(badge, k, radius),
]
