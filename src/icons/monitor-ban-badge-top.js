import { place } from '../clearance'
import { aroundTop, badgeTop } from '../monitor'
import { ban, cornerScale, outlines } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右上角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.ban, badgeTop, k), radius, stroke),
  ...danger(ban(badgeTop, k, radius)),
]
