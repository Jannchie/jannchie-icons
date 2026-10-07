import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { cloud, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 对话 + 右下角云
const k = cornerScale.cloud

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.cloud, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...info(cloud(badge, k, radius)),
]
