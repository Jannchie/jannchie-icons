import { badge, bubbleAround } from '../chat'
import { place } from '../clearance'
import { rounded } from '../geometry'
import { bookmark, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 对话 + 右下角书签
const k = cornerScale.bookmark

export default ({ radius, stroke }) => [
  ...bubbleAround(place(outlines.bookmark, badge, k), stroke, radius).map(p => rounded(p, radius, false)),
  ...accent(bookmark(badge, k, radius)),
]
