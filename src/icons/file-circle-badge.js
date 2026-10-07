import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, ring } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角圆
const k = cornerScale.ring

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.ring, badge, k), stroke, radius), radius, false),
  flap,
  ...accent(ring(badge, k, radius)),
]
