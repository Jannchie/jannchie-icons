import { place } from '../clearance'
import { badge, flap, pageAround } from '../file'
import { rounded } from '../geometry'
import { bookmark, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 文件 + 右下角书签
const k = cornerScale.bookmark

export default ({ radius, stroke }) => [
  rounded(pageAround(place(outlines.bookmark, badge, k), stroke, radius), radius, false),
  flap,
  ...accent(bookmark(badge, k, radius)),
]
