import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, shield } from '../symbols'
import { success } from '../tone'

// 列表 + 盾
const k = cornerScale.shield

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.shield, k, stroke, shield, radius)
  return [...lines, ...success(shield(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.shield, k, stroke, shield, radius)
  return [...lines, ...success(symbolFill('shield', shield(center, size, radius), stroke))]
}
