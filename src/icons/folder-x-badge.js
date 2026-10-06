import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, cross, outlines } from '../symbols'

// 文件夹 + 右下角叉
const k = cornerScale.cross

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.cross, badge, k), stroke), radius, false),
  ...cross(badge, k, radius),
]
