import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, arrowDown } from '../symbols'

// 文件夹 + 右下角下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.arrowDown, badge, k), stroke), radius, false),
  ...arrowDown(badge, k, radius),
]
