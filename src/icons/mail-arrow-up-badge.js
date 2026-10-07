import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { arrowUp, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.arrowUp, badge, k), stroke), radius, false),
  flap(radius),
  ...info(arrowUp(badge, k, radius)),
]
