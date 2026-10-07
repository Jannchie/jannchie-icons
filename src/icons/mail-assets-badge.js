import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { assets, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角素材
const k = cornerScale.assets

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.assets, badge, k), stroke), radius, false),
  flap(radius),
  ...accent(assets(badge, k, radius)),
]
