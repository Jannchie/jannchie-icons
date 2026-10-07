import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, minus, outlines } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右下角减号
const k = cornerScale.minus

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.minus, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...danger(minus(badge, k, radius))]
}
