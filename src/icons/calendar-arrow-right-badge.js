import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, arrowRight } from '../symbols'

// 日历 + 右下角右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.arrowRight, badge, k), radius, stroke),
  ...arrowRight(badge, k, radius),
]
