import { place } from '../clearance'
import { aroundTop, badgeTop } from '../book'
import { cornerScale, outlines, ring } from '../symbols'
import { accent } from '../tone'

// 书 + 右上角圆
const k = cornerScale.ring

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.ring, badgeTop, k), radius, stroke),
  ...accent(ring(badgeTop, k, radius)),
]
