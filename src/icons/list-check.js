import { listBadge } from '../list'
import { cornerScale, outlines, check } from '../symbols'
import { success } from '../tone'

// 列表 + 勾
const k = cornerScale.check

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.check, k, stroke, check, radius)
  return [...lines, ...success(check(center, size, radius))]
}
