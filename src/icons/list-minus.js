import { listBadge } from '../list'
import { cornerScale, outlines, minus } from '../symbols'
import { danger } from '../tone'

// 列表 + 减号
const k = cornerScale.minus

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.minus, k, stroke)
  return [...lines, ...danger(minus(center, k, radius))]
}
