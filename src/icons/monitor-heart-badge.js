import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右下角爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.heart, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...danger(heart(badge, k, radius))]
}
