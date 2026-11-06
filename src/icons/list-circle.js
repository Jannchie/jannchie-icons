import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, ring } from '../symbols'
import { accent } from '../tone'

// 列表 + 圆
const k = cornerScale.ring

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.ring, k, stroke, ring, radius)
  return [...lines, ...accent(ring(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.ring, k, stroke, ring, radius)
  return [...lines, ...accent(symbolFill('ring', ring(center, size, radius), stroke))]
}
