import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { clock, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.clock, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...info(clock(badge, k, radius)),
]
