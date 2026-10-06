import { listBadge } from '../list'
import { cornerScale, outlines, minus } from '../symbols'

// 列表 + 减号
const k = cornerScale.minus

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.minus, k, stroke)
  return [...lines, ...minus(center, k, radius)]
}
