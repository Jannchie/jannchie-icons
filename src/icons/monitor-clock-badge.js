import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { clock, cornerScale, outlines } from '../symbols'

// 显示器 + 右下角时钟
const k = cornerScale.clock

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.clock, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...clock(badge, k, radius)]
}
