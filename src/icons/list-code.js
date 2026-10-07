import { listBadge } from '../list'
import { code, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 列表 + 代码
const k = cornerScale.code

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.code, k, stroke)
  return [...lines, ...accent(code(center, size, radius))]
}
