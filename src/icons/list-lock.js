import { listBadge } from '../list'
import { cornerScale, lock, outlines } from '../symbols'

// 列表 + 锁
const k = cornerScale.lock

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.lock, k, stroke)
  return [...lines, ...lock(center, k, radius)]
}
