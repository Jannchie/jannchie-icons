import { listBadge } from '../list'
import { cornerScale, outlines, arrowDown } from '../symbols'
import { info } from '../tone'

// 列表 + 下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.arrowDown, k, stroke, arrowDown, radius)
  return [...lines, ...info(arrowDown(center, size, radius))]
}
