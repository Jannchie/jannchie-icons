import { listBadge } from '../list'
import { cornerScale, outlines, check } from '../symbols'

// 列表 + 勾
const k = cornerScale.check

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.check, k, stroke)
  return [...lines, ...check(center, k, radius)]
}
