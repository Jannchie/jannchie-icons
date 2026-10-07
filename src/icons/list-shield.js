import { listBadge } from '../list'
import { cornerScale, outlines, shield } from '../symbols'
import { success } from '../tone'

// 列表 + 盾
const k = cornerScale.shield

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.shield, k, stroke)
  return [...lines, ...success(shield(center, size, radius))]
}
