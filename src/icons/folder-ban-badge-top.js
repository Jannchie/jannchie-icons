import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { ban, cornerScale, outlines } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右上角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.ban, badgeTop, k), radius, stroke),
  ...danger(ban(badgeTop, k, radius)),
]
