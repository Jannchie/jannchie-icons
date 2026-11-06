import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, star } from '../symbols'
import { warning } from '../tone'

// 列表 + 收藏
const k = cornerScale.star

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.star, k, stroke, star, radius)
  return [...lines, ...warning(star(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.star, k, stroke, star, radius)
  return [...lines, ...warning(symbolFill('star', star(center, size, radius), stroke))]
}
