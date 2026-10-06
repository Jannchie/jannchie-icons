import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, puzzle } from '../symbols'

// 邮件 + 右下角拼图（模组）
const k = cornerScale.puzzle

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.puzzle, badge, k), stroke), radius, false),
  flap(radius),
  ...puzzle(badge, k, radius),
]
