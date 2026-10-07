import { place } from '../clearance'
import { aroundBase, badge } from '../briefcase'
import { cornerScale, outlines, bookmark } from '../symbols'
import { accent } from '../tone'

// 公文包 + 右下角书签
const k = cornerScale.bookmark

export default ({ radius, stroke }) => [
  ...aroundBase(place(outlines.bookmark, badge, k), radius, stroke),
  ...accent(bookmark(badge, k, radius)),
]
