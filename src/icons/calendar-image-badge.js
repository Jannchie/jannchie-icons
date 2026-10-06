import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, image } from '../symbols'

// 日历 + 右下角图片
const k = cornerScale.image

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.image, badge, k), radius, stroke),
  ...image(badge, k, radius),
]
