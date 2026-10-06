import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, plug } from '../symbols'

// 日历 + 右下角插头
const k = cornerScale.plug

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.plug, badge, k), radius, stroke),
  ...plug(badge, k, radius),
]
