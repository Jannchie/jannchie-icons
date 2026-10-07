import { listBadge } from '../list'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 列表 + 爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.heart, k, stroke)
  return [...lines, ...danger(heart(center, k, radius))]
}
