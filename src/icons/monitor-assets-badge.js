import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { assets, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角素材
const k = cornerScale.assets

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.assets, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...accent(assets(badge, k, radius))]
}
