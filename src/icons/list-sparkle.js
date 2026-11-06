import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, sparkle } from '../symbols'
import { accent } from '../tone'

// 列表 + 星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.sparkle, k, stroke, sparkle, radius)
  return [...lines, ...accent(sparkle(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.sparkle, k, stroke, sparkle, radius)
  return [...lines, ...accent(symbolFill('sparkle', sparkle(center, size, radius), stroke))]
}
