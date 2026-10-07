import { listBadge } from '../list'
import { cornerScale, outlines, plus } from '../symbols'
import { success } from '../tone'

// 列表 + 加号
const k = cornerScale.plus

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.plus, k, stroke)
  return [...lines, ...success(plus(center, k, radius))]
}
