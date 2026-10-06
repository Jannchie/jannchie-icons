import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, star } from '../symbols'

// 对话 + 右下角收藏
const k = cornerScale.star

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.star, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...star(badge, k, radius),
]
