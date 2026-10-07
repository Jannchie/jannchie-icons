import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, music, outlines } from '../symbols'
import { accent } from '../tone'

// 邮件 + 右下角音乐
const k = cornerScale.music

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.music, badge, k), stroke), radius, false),
  flap(radius),
  ...accent(music(badge, k, radius)),
]
