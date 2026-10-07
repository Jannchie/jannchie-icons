import { listBadge } from '../list'
import { cornerScale, outlines, sparkle } from '../symbols'
import { accent } from '../tone'

// 列表 + 星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.sparkle, k, stroke)
  return [...lines, ...accent(sparkle(center, k, radius))]
}
