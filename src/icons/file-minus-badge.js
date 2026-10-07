import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, minus, outlines } from '../symbols'
import { danger } from '../tone'

// 文件 + 右下角减号
const k = cornerScale.minus

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.minus, badge, k), stroke, radius), radius, false),
  flap,
  ...danger(minus(badge, k, radius)),
]
