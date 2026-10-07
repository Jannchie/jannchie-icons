import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, arrowRight } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角右箭头
const k = cornerScale.arrowRight

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.arrowRight, badge, k), stroke), radius, false),
  ...info(arrowRight(badge, k, radius)),
]
