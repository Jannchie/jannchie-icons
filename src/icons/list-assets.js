import { listBadge, symbolFill } from '../list'
import { cornerScale, outlines, assets } from '../symbols'
import { accent } from '../tone'

// 列表 + 素材
const k = cornerScale.assets

export default ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.assets, k, stroke, assets, radius)
  return [...lines, ...accent(assets(center, size, radius))]
}

// 实心：行线照旧，符号填实
export const fill = ({ radius, stroke }) => {
  const { center, size, lines } = listBadge(outlines.assets, k, stroke, assets, radius)
  return [...lines, ...accent(symbolFill('assets', assets(center, size, radius), stroke))]
}
