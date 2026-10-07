import { place } from '../clearance'
import { aroundTop, badgeTop } from '../chat'
import { arrowUp, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.arrowUp, badgeTop, k), radius, stroke),
  ...info(arrowUp(badgeTop, k, radius)),
]
