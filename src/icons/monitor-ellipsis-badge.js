import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, ellipsis } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角省略号
const k = cornerScale.ellipsis

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.ellipsis, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...accent(ellipsis(badge, k, radius))]
}
