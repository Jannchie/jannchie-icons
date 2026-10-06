import { listBadge } from '../list'
import { cornerScale, outlines, gauge } from '../symbols'

// 列表 + 计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.gauge, k, stroke)
  return [...lines, ...gauge(center, k, radius)]
}
