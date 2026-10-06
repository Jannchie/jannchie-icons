import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, shield } from '../symbols'

// 对话 + 右下角盾
const k = cornerScale.shield

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.shield, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...shield(badge, k, radius),
]
