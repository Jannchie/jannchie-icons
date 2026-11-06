import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, search } from '../symbols'
import { info } from '../tone'

// 列表 + 搜索
const k = cornerScale.search

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.search, k, stroke, search, radius)
  return [...lines, ...info(search(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.search, k, stroke, search, radius)
  return [...lines, ...info(symbolFill('search', search(center, size, radius), stroke))]
}
