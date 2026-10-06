import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, minus } from '../symbols'

// 公文包 + 右下角减号
const k = cornerScale.minus

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.minus, badge, k), radius, stroke),
  ...minus(badge, k, radius),
]
