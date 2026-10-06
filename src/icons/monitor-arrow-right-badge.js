import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { arrowRight, cornerScale, outlines } from '../symbols'

// 显示器 + 右下角右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.arrowRight, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...arrowRight(badge, k, radius)]
}
