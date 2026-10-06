import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, arrowLeft } from '../symbols'

// 日历 + 右下角左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.arrowLeft, badge, k), radius, stroke),
  ...arrowLeft(badge, k, radius),
]
