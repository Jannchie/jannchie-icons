import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { bookmark, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角书签
const k = cornerScale.bookmark

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.bookmark, badge, k), stroke), radius, false),
  flap(radius),
  ...accent(bookmark(badge, k, radius)),
]
