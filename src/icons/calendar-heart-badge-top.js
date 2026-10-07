import { place } from '../clearance'
import { aroundTop, badgeTop } from '../calendar'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 日历 + 右上角爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.heart, badgeTop, k), radius, stroke),
  ...danger(heart(badgeTop, k, radius)),
]
