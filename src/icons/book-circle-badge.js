import { place } from '../clearance'
import { aroundBase, badge } from '../book'
import { cornerScale, outlines, ring } from '../symbols'
import { accent } from '../tone'

// 书 + 右下角圆
const k = cornerScale.ring

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.ring, badge, k), radius, stroke),
  ...accent(ring(badge, k, radius)),
]
