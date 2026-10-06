import { listBadge } from '../list'
import { cornerScale, outlines, image } from '../symbols'

// 列表 + 图片
const k = cornerScale.image

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.image, k, stroke)
  return [...lines, ...image(center, k, radius)]
}
