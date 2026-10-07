import { listBadge } from '../list'
import { cornerScale, outlines, image } from '../symbols'
import { accent } from '../tone'

// 列表 + 图片
const k = cornerScale.image

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.image, k, stroke)
  return [...lines, ...accent(image(center, k, radius))]
}
