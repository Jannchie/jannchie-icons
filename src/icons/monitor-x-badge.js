import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, cross, outlines } from '../symbols'

// 显示器 + 右下角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.cross, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...cross(badge, k, radius)]
}
