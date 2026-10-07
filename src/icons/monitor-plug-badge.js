import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, plug } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角插头
const k = cornerScale.plug

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.plug, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...accent(plug(badge, k, radius))]
}
