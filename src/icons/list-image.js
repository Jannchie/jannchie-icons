import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, image } from '../symbols'
import { accent } from '../tone'

// 列表 + 图片
const k = cornerScale.image

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.image, k, stroke, image, radius)
  return [...lines, ...accent(image(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.image, k, stroke, image, radius)
  return [...lines, ...accent(symbolFill('image', image(center, size, radius), stroke))]
}
