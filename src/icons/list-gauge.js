import { listBadge } from '../list'
import { cornerScale, outlines, gauge } from '../symbols'
import { info } from '../tone'

// 列表 + 计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.gauge, k, stroke)
  return [...lines, ...info(gauge(center, k, radius))]
}
