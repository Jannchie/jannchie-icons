import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, clock } from '../symbols'

// 日历 + 右下角时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.clock, badge, k), radius, stroke),
  ...clock(badge, k, radius),
]
