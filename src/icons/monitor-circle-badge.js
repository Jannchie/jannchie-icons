import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, ring } from '../symbols'

// 显示器 + 右下角圆
const k = cornerScale.ring

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.ring, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...ring(badge, k, radius)]
}
