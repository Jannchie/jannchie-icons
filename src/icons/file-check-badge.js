import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { check, cornerScale, outlines } from '../symbols'
import { success } from '../tone'

// 文件 + 右下角勾
const k = cornerScale.check

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.check, badge, k), stroke, radius), radius, false),
  flap,
  ...success(check(badge, k, radius)),
]
