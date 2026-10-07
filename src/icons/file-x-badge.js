import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { cornerScale, cross, outlines } from '../symbols'
import { danger } from '../tone'

// 文件 + 右下角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.cross, badge, k), stroke, radius), radius, false),
  flap,
  ...danger(cross(badge, k, radius)),
]
