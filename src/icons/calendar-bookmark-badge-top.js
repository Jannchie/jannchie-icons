import { place } from '../clearance'
import { aroundTop, badgeTop } from '../calendar'
import { bookmark, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 日历 + 右上角书签
const k = cornerScale.bookmark

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.bookmark, badgeTop, k), radius, stroke),
  ...accent(bookmark(badgeTop, k, radius)),
]
