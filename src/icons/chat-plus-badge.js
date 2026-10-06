import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cornerScale, outlines, plus } from '../symbols'

// 对话 + 右下角加号
const k = cornerScale.plus

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.plus, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...plus(badge, k, radius),
]
