import { listBadge } from '../list'
import { cornerScale, outlines, ring } from '../symbols'
import { accent } from '../tone'

// 列表 + 圆
const k = cornerScale.ring

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.ring, k, stroke, ring, radius)
  return [...lines, ...accent(ring(center, size, radius))]
}
