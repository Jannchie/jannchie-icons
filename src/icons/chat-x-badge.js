import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, cross, outlines } from '../symbols'
import { danger } from '../tone'

// 对话 + 右下角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.cross, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...danger(cross(badge, k, radius)),
]
