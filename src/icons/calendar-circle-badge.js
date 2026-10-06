import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, ring } from '../symbols'

// 日历 + 右下角圆
const k = cornerScale.ring

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.ring, badge, k), radius, stroke),
  ...ring(badge, k, radius),
]
