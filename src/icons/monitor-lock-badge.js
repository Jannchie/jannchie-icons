import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, lock, outlines } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右下角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.lock, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...warning(lock(badge, k, radius))]
}
