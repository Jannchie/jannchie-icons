import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, check } from '../symbols'

// 文件夹 + 右下角勾
const k = cornerScale.check

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.check, badge, k), stroke), radius, false),
  ...check(badge, k, radius),
]
