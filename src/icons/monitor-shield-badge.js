import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, shield } from '../symbols'
import { success } from '../tone'

// 显示器 + 右下角盾
const k = cornerScale.shield

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.shield, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...success(shield(badge, k, radius))]
}
