import { place } from '../clearance'
import { aroundTop, badgeTop } from '../calendar'
import { arrowLeft, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 日历 + 右上角左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.arrowLeft, badgeTop, k), radius, stroke),
  ...info(arrowLeft(badgeTop, k, radius)),
]
