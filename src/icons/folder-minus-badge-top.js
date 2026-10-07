import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, minus, outlines } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右上角减号
const k = cornerScale.minus

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.minus, badgeTop, k), radius, stroke),
  ...danger(minus(badgeTop, k, radius)),
]
