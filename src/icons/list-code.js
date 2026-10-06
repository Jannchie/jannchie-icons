import { listBadge } from '../list'
import { code, cornerScale, outlines } from '../symbols'

// 列表 + 代码
const k = cornerScale.code

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.code, k, stroke)
  return [...lines, ...code(center, k, radius)]
}
