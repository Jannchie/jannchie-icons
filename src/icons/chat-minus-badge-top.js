import { place } from '../clearance'
import { aroundTop, badgeTop } from '../chat'
import { cornerScale, minus, outlines } from '../symbols'
import { danger } from '../tone'

// 对话 + 右上角减号
const k = cornerScale.minus

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.minus, badgeTop, k), radius, stroke),
  ...danger(minus(badgeTop, k, radius)),
]
