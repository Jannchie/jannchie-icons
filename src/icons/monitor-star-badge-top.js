import { place } from '../clearance'
import { aroundTop, badgeTop } from '../monitor'
import { cornerScale, outlines, star } from '../symbols'
import { warning } from '../tone'

// 显示器 + 右上角收藏
const k = cornerScale.star

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.star, badgeTop, k), radius, stroke),
  ...warning(star(badgeTop, k, radius)),
]
