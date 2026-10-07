import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { arrowDown, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.arrowDown, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...info(arrowDown(badge, k, radius))]
}
