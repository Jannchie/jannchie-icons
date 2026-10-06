import { place } from '../clearance'
import { aroundBase, badge } from '../calendar'
import { cornerScale, outlines, bookmark } from '../symbols'

// 日历 + 右下角书签
const k = cornerScale.bookmark

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.bookmark, badge, k), radius, stroke),
  ...bookmark(badge, k, radius),
]
