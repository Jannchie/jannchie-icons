import { listBadge } from '../list'
import { cornerScale, outlines, arrowUp } from '../symbols'

// 列表 + 上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.arrowUp, k, stroke)
  return [...lines, ...arrowUp(center, k, radius)]
}
