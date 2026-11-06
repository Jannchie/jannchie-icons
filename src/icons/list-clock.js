import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, clock } from '../symbols'
import { info } from '../tone'

// 列表 + 时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.clock, k, stroke, clock, radius)
  return [...lines, ...info(clock(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.clock, k, stroke, clock, radius)
  return [...lines, ...info(symbolFill('clock', clock(center, size, radius), stroke))]
}
