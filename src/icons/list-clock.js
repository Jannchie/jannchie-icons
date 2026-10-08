import { listBadge } from '../list'
import { cornerScale, outlines, clock } from '../symbols'
import { info } from '../tone'

// 列表 + 时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.clock, k, stroke, clock, radius)
  return [...lines, ...info(clock(center, size, radius))]
}
