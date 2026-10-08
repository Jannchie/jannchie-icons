import { listBadge } from '../list'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 列表 + 爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.heart, k, stroke, heart, radius)
  return [...lines, ...danger(heart(center, size, radius))]
}
