import { listBadge } from '../list'
import { bookmark, cornerScale, outlines } from '../symbols'

// 书签列表
const k = cornerScale.bookmark

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.bookmark, k, stroke)
  return [...lines, ...bookmark(center, k, radius)]
}
