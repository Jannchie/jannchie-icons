import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 日历 + 右下角爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.heart, badge, k), radius, stroke),
  ...danger(heart(badge, k, radius)),
]
