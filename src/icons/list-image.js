import { listBadge } from '../list'
import { cornerScale, outlines, image } from '../symbols'
import { accent } from '../tone'

// 列表 + 图片
const k = cornerScale.image

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.image, k, stroke, image, radius)
  return [...lines, ...accent(image(center, size, radius))]
}
