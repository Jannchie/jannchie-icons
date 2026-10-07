import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, ring } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角圆
const k = cornerScale.ring

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.ring, badge, k), stroke), radius, false),
  ...accent(ring(badge, k, radius)),
]
