import { listBadge } from '../list'
import { cornerScale, outlines, cross } from '../symbols'

// 列表 + 叉
const k = cornerScale.cross

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.cross, k, stroke)
  return [...lines, ...cross(center, k, radius)]
}
