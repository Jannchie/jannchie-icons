import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cloud, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 邮件 + 右下角云
const k = cornerScale.cloud

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.cloud, badge, k), stroke), radius, false),
  flap(radius),
  ...info(cloud(badge, k, radius)),
]
