import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, outlines, search } from '../symbols'
import { info } from '../tone'

// 显示器 + 右下角搜索
const k = cornerScale.search

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.search, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...info(search(badge, k, radius))]
}
