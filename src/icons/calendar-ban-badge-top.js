import { place } from '../clearance'
import { aroundTop, badgeTop } from '../calendar'
import { ban, cornerScale, outlines } from '../symbols'
import { danger } from '../tone'

// 日历 + 右上角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.ban, badgeTop, k), radius, stroke),
  ...danger(ban(badgeTop, k, radius)),
]
