import { listBadge } from '../list'
import { cornerScale, outlines, assets } from '../symbols'

// 列表 + 素材
const k = cornerScale.assets

export default ({ radius, stroke }) => {
  const { center, lines } = listBadge(outlines.assets, k, stroke)
  return [...lines, ...assets(center, k, radius)]
}
