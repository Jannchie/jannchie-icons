import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { arrowDown, cornerScale, outlines } from '../symbols'

// 邮件 + 右下角下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.arrowDown, badge, k), stroke), radius, false),
  flap(radius),
  ...arrowDown(badge, k, radius),
]
