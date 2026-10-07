import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { check, cornerScale, outlines } from '../symbols'
import { success } from '../tone'

// 显示器 + 右下角勾
const k = cornerScale.check

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.check, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...success(check(badge, k, radius))]
}
