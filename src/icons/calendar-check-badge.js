import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, check } from '../symbols'

// 日历 + 右下角勾
const k = cornerScale.check

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.check, badge, k), radius, stroke),
  ...check(badge, k, radius),
]
