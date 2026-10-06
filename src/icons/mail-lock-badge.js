import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, lock, outlines } from '../symbols'

// 邮件 + 右下角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.lock, badge, k), stroke), radius, false),
  flap(radius),
  ...lock(badge, k, radius),
]
