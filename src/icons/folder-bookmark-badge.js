import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { bookmark, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角书签
const k = cornerScale.bookmark

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.bookmark, badge, k), stroke), radius, false),
  ...accent(bookmark(badge, k, radius)),
]
