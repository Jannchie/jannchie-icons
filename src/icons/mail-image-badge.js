import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, image, outlines } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角图片
const k = cornerScale.image

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.image, badge, k), stroke), radius, false),
  flap(radius),
  ...accent(image(badge, k, radius)),
]
