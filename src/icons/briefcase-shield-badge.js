import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, shield } from '../symbols'

// 公文包 + 右下角盾
const k = cornerScale.shield

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.shield, badge, k), radius, stroke),
  ...shield(badge, k, radius),
]
