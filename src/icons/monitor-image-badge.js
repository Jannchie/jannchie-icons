import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, screenAround } from '../monitor'
import { cornerScale, image, outlines } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右下角图片
const k = cornerScale.image

export default ({ radius, stroke }) => {
  const { outline, stand } = screenAround(place(outlines.image, badge, k), stroke)
  return [rounded(outline, Math.min(radius, 2.5), false), ...stand, ...accent(image(badge, k, radius))]
}
