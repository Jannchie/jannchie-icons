import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cloud, cornerScale, outlines } from '../symbols'

// 显示器 + 右下角云
const k = cornerScale.cloud

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.cloud, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...cloud(badge, k, radius)]
}
