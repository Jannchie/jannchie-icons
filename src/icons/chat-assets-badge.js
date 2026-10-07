import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { assets, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角素材
const k = cornerScale.assets

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.assets, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...accent(assets(badge, k, radius)),
]
