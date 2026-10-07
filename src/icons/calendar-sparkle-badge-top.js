import { place } from '../clearance'
import { aroundTop, badgeTop } from '../calendar'
import { cornerScale, outlines, sparkle } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.sparkle, badgeTop, k), radius, stroke),
  ...accent(sparkle(badgeTop, k, radius)),
]
