import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, star } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右下角收藏
const k = cornerScale.star

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.star, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...warning(star(badge, k, radius))]
}
