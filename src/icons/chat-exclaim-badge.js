import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, exclaim } from '../symbols'
import { warning } from '../tone'

// 对话 + 右下角感叹号
const k = cornerScale.exclaim

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.exclaim, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...warning(exclaim(badge, k, radius)),
]
