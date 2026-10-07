import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 公文包 + 右下角爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.heart, badge, k), radius, stroke),
  ...danger(heart(badge, k, radius)),
]
