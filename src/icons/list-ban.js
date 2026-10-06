import { listBadge } from '../list'
import { cornerScale, outlines, ban } from '../symbols'

// 列表 + 禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.ban, k, stroke)
  return [...lines, ...ban(center, k, radius)]
}
