import { place } from '../clearance'
import { aroundTop, badgeTop } from '../monitor'
import { cornerScale, outlines, ellipsis } from '../symbols'
import { accent } from '../tone'

// 显示器 + 右上角省略号
const k = cornerScale.ellipsis

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.ellipsis, badgeTop, k), radius, stroke),
  ...accent(ellipsis(badgeTop, k, radius)),
]
