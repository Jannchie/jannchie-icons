import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, arrowRight } from '../symbols'

// 公文包 + 右下角右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.arrowRight, badge, k), radius, stroke),
  ...arrowRight(badge, k, radius),
]
