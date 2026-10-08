import { listBadge } from '../list'
import { cornerScale, outlines, assets } from '../symbols'
import { accent } from '../tone'

// 列表 + 素材
const k = cornerScale.assets

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.assets, k, stroke, assets, radius)
  return [...lines, ...accent(assets(center, size, radius))]
}
