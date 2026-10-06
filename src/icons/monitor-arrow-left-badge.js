import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { arrowLeft, cornerScale, outlines } from '../symbols'

// 显示器 + 右下角左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.arrowLeft, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...arrowLeft(badge, k, radius)]
}
