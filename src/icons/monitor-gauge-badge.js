import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, gauge, outlines } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角计速器
const k = cornerScale.gauge

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.gauge, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...info(gauge(badge, k, radius))]
}
