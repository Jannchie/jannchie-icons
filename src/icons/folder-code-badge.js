import { place } from '../clearance'
import { badge, folderAround } from '../folder'
import { rounded } from '../geometry'
import { code, cornerScale, outlines } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角代码
const k = cornerScale.code

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.code, badge, k), stroke), radius, false),
  ...accent(code(badge, k, radius)),
]
