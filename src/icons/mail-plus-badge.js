import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, plus } from '../symbols'
import { success } from '../tone'

// 邮件 + 右下角加号
const k = cornerScale.plus

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.plus, badge, k), stroke), radius, false),
  flap(radius),
  ...success(plus(badge, k, radius)),
]
