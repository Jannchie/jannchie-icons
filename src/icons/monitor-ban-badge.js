import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { ban, cornerScale, outlines } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右下角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.ban, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...danger(ban(badge, k, radius))]
}
