import { place } from '../clearance'
import { aroundTop, badgeTop } from '../chat'
import { arrowRight, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.arrowRight, badgeTop, k), radius, stroke),
  ...info(arrowRight(badgeTop, k, radius)),
]
