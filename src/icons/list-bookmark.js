import { listBadge } from '../list'
import { bookmark, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 书签列表
const k = cornerScale.bookmark

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.bookmark, k, stroke)
  return [...lines, ...accent(bookmark(center, size, radius))]
}
