import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, outlines, star } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 右上角收藏
const k = cornerScale.star

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.star, badgeTop, k), radius, stroke),
  ...warning(star(badgeTop, k, radius)),
]
