import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, video } from '../symbols'

// 邮件 + 右下角视频
const k = cornerScale.video

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.video, badge, k), stroke), radius, false),
  flap(radius),
  ...video(badge, k, radius),
]
