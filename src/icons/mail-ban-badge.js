import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { ban, cornerScale, outlines } from '../symbols'
import { danger } from '../tone'

// 邮件 + 右下角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.ban, badge, k), stroke), radius, false),
  flap(radius),
  ...danger(ban(badge, k, radius)),
]
