import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, sparkle } from '../symbols'

// 日历 + 右下角星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.sparkle, badge, k), radius, stroke),
  ...sparkle(badge, k, radius),
]
