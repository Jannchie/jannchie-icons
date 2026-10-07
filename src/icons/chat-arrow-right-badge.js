import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { arrowRight, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.arrowRight, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...info(arrowRight(badge, k, radius)),
]
