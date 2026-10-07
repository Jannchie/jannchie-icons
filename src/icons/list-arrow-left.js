import { listBadge } from '../list'
import { cornerScale, outlines, arrowLeft } from '../symbols'
import { info } from '../tone'

// 列表 + 左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.arrowLeft, k, stroke)
  return [...lines, ...info(arrowLeft(center, k, radius))]
}
