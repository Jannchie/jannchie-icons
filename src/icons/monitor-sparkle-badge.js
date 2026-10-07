import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, sparkle } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.sparkle, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...accent(sparkle(badge, k, radius))]
}
