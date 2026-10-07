import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, shield } from '../symbols'
import { success } from '../tone'

// 邮件 + 右下角盾
const k = cornerScale.shield

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.shield, badge, k), stroke), radius, false),
  flap(radius),
  ...success(shield(badge, k, radius)),
]
