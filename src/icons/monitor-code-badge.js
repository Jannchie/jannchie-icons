import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { code, cornerScale, outlines } from '../symbols'

// 显示器 + 右下角代码
const k = cornerScale.code

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.code, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...code(badge, k, radius)]
}
