import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, image, outlines } from '../symbols'

// 文件 + 右下角图片
const k = cornerScale.image

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.image, badge, k), stroke, radius), radius, false),
  flap,
  ...image(badge, k, radius),
]
