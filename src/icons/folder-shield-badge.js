import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, shield } from '../symbols'

// 文件夹 + 右下角盾
const k = cornerScale.shield

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.shield, badge, k), stroke), radius, false),
  ...shield(badge, k, radius),
]
