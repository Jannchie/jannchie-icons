import { place } from '../clearance'
import { aroundTop, badgeTop } from '../chat'
import { cornerScale, outlines, exclaim } from '../symbols'
import { warning } from '../tone'

// 对话 + 右上角感叹号
const k = cornerScale.exclaim

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.exclaim, badgeTop, k), radius, stroke),
  ...warning(exclaim(badgeTop, k, radius)),
]
