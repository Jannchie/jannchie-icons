import { listBadge } from '../list'
import { cornerScale, outlines, star } from '../symbols'
import { warning } from '../tone'

// 列表 + 收藏
const k = cornerScale.star

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.star, k, stroke)
  return [...lines, ...warning(star(center, size, radius))]
}
