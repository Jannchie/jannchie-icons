import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, plug } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角插头
const k = cornerScale.plug

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.plug, badge, k), stroke), radius, false),
  ...accent(plug(badge, k, radius)),
]
