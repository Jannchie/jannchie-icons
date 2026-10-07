import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, outlines, plug } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右上角插头
const k = cornerScale.plug

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.plug, badgeTop, k), radius, stroke),
  ...accent(plug(badgeTop, k, radius)),
]
