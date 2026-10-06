import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { code, cornerScale, outlines } from '../symbols'

// 邮件 + 右下角代码
const k = cornerScale.code

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.code, badge, k), stroke), radius, false),
  flap(radius),
  ...code(badge, k, radius),
]
