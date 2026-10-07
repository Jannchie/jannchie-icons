import { listBadge } from '../list'
import { cornerScale, outlines, plug } from '../symbols'
import { accent } from '../tone'

// 列表 + 插头
const k = cornerScale.plug

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.plug, k, stroke)
  return [...lines, ...accent(plug(center, size, radius))]
}
