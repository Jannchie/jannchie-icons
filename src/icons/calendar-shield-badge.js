import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, shield } from '../symbols'
import { success } from '../tone'

// 日历 + 右下角盾
const k = cornerScale.shield

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.shield, badge, k), radius, stroke),
  ...success(shield(badge, k, radius)),
]
