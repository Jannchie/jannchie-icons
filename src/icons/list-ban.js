import { listBadge } from '../list'
import { cornerScale, outlines, ban } from '../symbols'
import { danger } from '../tone'

// 列表 + 禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.ban, k, stroke, ban, radius)
  return [...lines, ...danger(ban(center, size, radius))]
}
