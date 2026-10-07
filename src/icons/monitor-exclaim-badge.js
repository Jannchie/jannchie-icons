import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, exclaim } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右下角感叹号
const k = cornerScale.exclaim

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.exclaim, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...warning(exclaim(badge, k, radius))]
}
