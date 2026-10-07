import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, heart } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 右下角爱心
const k = cornerScale.heart

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.heart, badge, k), stroke), radius, false),
  ...danger(heart(badge, k, radius)),
]
