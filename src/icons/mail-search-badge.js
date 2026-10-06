import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, envelopeAround, flap } from '../mail'
import { cornerScale, outlines, search } from '../symbols'

// 邮件 + 右下角搜索
const k = cornerScale.search

export default ({ radius, stroke }) => [
  rounded(envelopeAround(place(outlines.search, badge, k), stroke), radius, false),
  flap(radius),
  ...search(badge, k, radius),
]
