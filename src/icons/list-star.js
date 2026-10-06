import { listBadge } from '../list'
import { cornerScale, outlines, star } from '../symbols'

// 列表 + 收藏
const k = cornerScale.star

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.star, k, stroke)
  return [...lines, ...star(center, k, radius)]
}
