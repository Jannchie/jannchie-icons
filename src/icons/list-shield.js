import { listBadge } from '../list'
import { cornerScale, outlines, shield } from '../symbols'

// 列表 + 盾
const k = cornerScale.shield

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.shield, k, stroke)
  return [...lines, ...shield(center, k, radius)]
}
