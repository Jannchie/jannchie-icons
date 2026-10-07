import { listBadge } from '../list'
import { cornerScale, outlines, arrowDown } from '../symbols'
import { info } from '../tone'

// 列表 + 下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.arrowDown, k, stroke)
  return [...lines, ...info(arrowDown(center, k, radius))]
}
