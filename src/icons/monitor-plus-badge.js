import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, plus } from '../symbols'
import { success } from '../tone'

// 显示器 + 右下角加号
const k = cornerScale.plus

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.plus, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...success(plus(badge, k, radius))]
}
