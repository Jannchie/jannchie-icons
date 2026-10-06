import { listBadge } from '../list'
import { cornerScale, outlines, arrowDown } from '../symbols'

// 列表 + 下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.arrowDown, k, stroke)
  return [...lines, ...arrowDown(center, k, radius)]
}
