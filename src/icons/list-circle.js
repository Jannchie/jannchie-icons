import { listBadge } from '../list'
import { cornerScale, outlines, ring } from '../symbols'

// 列表 + 圆
const k = cornerScale.ring

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.ring, k, stroke)
  return [...lines, ...ring(center, k, radius)]
}
