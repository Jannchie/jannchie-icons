import { place } from '../clearance'
import { aroundTop, badgeTop } from '../chat'
import { cornerScale, outlines, shield } from '../symbols'
import { success } from '../tone'

// 对话 + 右上角盾
const k = cornerScale.shield

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.shield, badgeTop, k), radius, stroke),
  ...success(shield(badgeTop, k, radius)),
]
