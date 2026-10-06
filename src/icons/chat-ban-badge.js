import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { ban, cornerScale, outlines } from '../symbols'

// 对话 + 右下角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.ban, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...ban(badge, k, radius),
]
