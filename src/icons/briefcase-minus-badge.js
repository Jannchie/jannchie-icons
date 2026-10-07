import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, minus } from '../symbols'
import { danger } from '../tone'

// 公文包 + 右下角减号
const k = cornerScale.minus

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.minus, badge, k), radius, stroke),
  ...danger(minus(badge, k, radius)),
]
