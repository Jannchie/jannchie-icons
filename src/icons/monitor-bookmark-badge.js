import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { bookmark, cornerScale, outlines } from '../symbols'

// 显示器 + 右下角书签
const k = cornerScale.bookmark

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.bookmark, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...bookmark(badge, k, radius)]
}
