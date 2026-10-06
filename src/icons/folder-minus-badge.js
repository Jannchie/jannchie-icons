import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, minus } from '../symbols'

// 文件夹 + 右下角减号
const k = cornerScale.minus

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.minus, badge, k), stroke), radius, false),
  ...minus(badge, k, radius),
]
