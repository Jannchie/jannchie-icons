import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, minus, outlines } from '../symbols'
import { danger } from '../tone'

// 对话 + 右下角减号
const k = cornerScale.minus

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.minus, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...danger(minus(badge, k, radius)),
]
