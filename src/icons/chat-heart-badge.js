import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 对话 + 右下角爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.heart, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...danger(heart(badge, k, radius)),
]
