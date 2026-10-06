import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { arrowUp, cornerScale, outlines } from '../symbols'

// 显示器 + 右下角上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.arrowUp, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...arrowUp(badge, k, radius)]
}
