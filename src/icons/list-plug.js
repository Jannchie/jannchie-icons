import { listBadge } from '../list'
import { cornerScale, outlines, plug } from '../symbols'

// 列表 + 插头
const k = cornerScale.plug

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.plug, k, stroke)
  return [...lines, ...plug(center, k, radius)]
}
