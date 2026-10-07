import { place } from '../clearance'
import { aroundTop, badgeTop } from '../chat'
import { cornerScale, cross, outlines } from '../symbols'
import { danger } from '../tone'

// 对话 + 右上角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.cross, badgeTop, k), radius, stroke),
  ...danger(cross(badgeTop, k, radius)),
]
