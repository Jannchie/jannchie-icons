import { place } from '../clearance'
import { aroundTop, badgeTop } from '../monitor'
import { arrowRight, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 显示器 + 右上角右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.arrowRight, badgeTop, k), radius, stroke),
  ...info(arrowRight(badgeTop, k, radius)),
]
