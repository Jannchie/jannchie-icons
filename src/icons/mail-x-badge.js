import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, cross, outlines } from '../symbols'
import { danger } from '../tone'

// 邮件 + 右下角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.cross, badge, k), stroke), radius, false),
  flap(radius),
  ...danger(cross(badge, k, radius)),
]
