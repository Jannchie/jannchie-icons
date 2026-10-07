import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { arrowRight, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.arrowRight, badge, k), stroke), radius, false),
  flap(radius),
  ...info(arrowRight(badge, k, radius)),
]
