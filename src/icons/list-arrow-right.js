import { listBadge } from '../list'
import { cornerScale, outlines, arrowRight } from '../symbols'

// 列表 + 右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.arrowRight, k, stroke)
  return [...lines, ...arrowRight(center, k, radius)]
}
