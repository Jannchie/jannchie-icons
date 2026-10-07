import { place } from '../clearance'
import { aroundTop, badgeTop } from '../chat'
import { cloud, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 对话 + 右上角云
const k = cornerScale.cloud

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.cloud, badgeTop, k), radius, stroke),
  ...info(cloud(badgeTop, k, radius)),
]
