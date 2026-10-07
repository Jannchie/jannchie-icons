import { listBadge } from '../list'
import { cornerScale, lock, outlines } from '../symbols'
import { warning } from '../tone'

// 列表 + 锁
const k = cornerScale.lock

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.lock, k, stroke)
  return [...lines, ...warning(lock(center, size, radius))]
}
