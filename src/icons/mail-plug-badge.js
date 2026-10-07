import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, plug } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角插头
const k = cornerScale.plug

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.plug, badge, k), stroke), radius, false),
  flap(radius),
  ...accent(plug(badge, k, radius)),
]
