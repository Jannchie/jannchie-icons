import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, arrowUp } from '../symbols'

// 文件夹 + 右下角上箭头
const k = cornerScale.arrowUp

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.arrowUp, badge, k), stroke), radius, false),
  ...arrowUp(badge, k, radius),
]
