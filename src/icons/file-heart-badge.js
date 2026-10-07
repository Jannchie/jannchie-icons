import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 文件 + 右下角爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.heart, badge, k), stroke, radius), radius, false),
  flap,
  ...danger(heart(badge, k, radius)),
]
