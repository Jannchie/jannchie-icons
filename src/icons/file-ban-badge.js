import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { ban, cornerScale, outlines } from '../symbols'
import { danger } from '../tone'

// 文件 + 右下角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.ban, badge, k), stroke, radius), radius, false),
  flap,
  ...danger(ban(badge, k, radius)),
]
