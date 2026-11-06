import { listBadge, symbolFill } from '../list'
import { bookmark, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 书签列表
const k = cornerScale.bookmark

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.bookmark, k, stroke, bookmark, radius)
  return [...lines, ...accent(bookmark(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.bookmark, k, stroke, bookmark, radius)
  return [...lines, ...accent(symbolFill('bookmark', bookmark(center, size, radius), stroke))]
}
