import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, cross, outlines } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右上角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.cross, badgeTop, k), radius, stroke),
  ...danger(cross(badgeTop, k, radius)),
]
