import { listBadge } from '../list'
import { cornerScale, outlines, clock } from '../symbols'

// 列表 + 时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.clock, k, stroke)
  return [...lines, ...clock(center, k, radius)]
}
