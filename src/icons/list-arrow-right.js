import { listBadge } from '../list'
import { cornerScale, outlines, arrowRight } from '../symbols'
import { info } from '../tone'

// 列表 + 右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.arrowRight, k, stroke, arrowRight, radius)
  return [...lines, ...info(arrowRight(center, size, radius))]
}
