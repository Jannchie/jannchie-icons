import { listBadge, symbolFill } from '../list'
import { cornerScale, lock, outlines } from '../symbols'
import { warning } from '../tone'

// 列表 + 锁
const k = cornerScale.lock

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.lock, k, stroke, lock, radius)
  return [...lines, ...warning(lock(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.lock, k, stroke, lock, radius)
  return [...lines, ...warning(symbolFill('lock', lock(center, size, radius), stroke))]
}
