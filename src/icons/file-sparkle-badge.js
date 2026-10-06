import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, sparkle } from '../symbols'

// 文件 + 右下角星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.sparkle, badge, k), stroke, radius), radius, false),
  flap,
  ...sparkle(badge, k, radius),
]
