import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, star } from '../symbols'

// 邮件 + 右下角收藏
const k = cornerScale.star

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.star, badge, k), stroke), radius, false),
  flap(radius),
  ...star(badge, k, radius),
]
