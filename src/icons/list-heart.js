import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 列表 + 爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.heart, k, stroke, heart, radius)
  return [...lines, ...danger(heart(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.heart, k, stroke, heart, radius)
  return [...lines, ...danger(symbolFill('heart', heart(center, size, radius), stroke))]
}
