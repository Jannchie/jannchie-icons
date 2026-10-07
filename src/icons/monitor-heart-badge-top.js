import { place } from '../clearance'
import { aroundTop, badgeTop } from '../monitor'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 显示器 + 右上角爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.heart, badgeTop, k), radius, stroke),
  ...danger(heart(badgeTop, k, radius)),
]
