import { listBadge } from '../list'
import { cornerScale, outlines, arrowUp } from '../symbols'
import { info } from '../tone'

// 列表 + 上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.arrowUp, k, stroke)
  return [...lines, ...info(arrowUp(center, k, radius))]
}
