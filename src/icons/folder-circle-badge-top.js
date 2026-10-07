import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, outlines, ring } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角圆
const k = cornerScale.ring

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.ring, badgeTop, k), radius, stroke),
  ...accent(ring(badgeTop, k, radius)),
]
