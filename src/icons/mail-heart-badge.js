import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 邮件 + 右下角爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.heart, badge, k), stroke), radius, false),
  flap(radius),
  ...danger(heart(badge, k, radius)),
]
