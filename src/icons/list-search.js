import { listBadge } from '../list'
import { cornerScale, outlines, search } from '../symbols'
import { info } from '../tone'

// 列表 + 搜索
const k = cornerScale.search

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.search, k, stroke)
  return [...lines, ...info(search(center, k, radius))]
}
