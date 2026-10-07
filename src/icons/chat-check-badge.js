import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { check, cornerScale, outlines } from '../symbols'
import { success } from '../tone'

// 对话 + 右下角勾
const k = cornerScale.check

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.check, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...success(check(badge, k, radius)),
]
