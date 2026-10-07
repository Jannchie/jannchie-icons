import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, arrowLeft } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右下角左箭头
const k = cornerScale.arrowLeft

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.arrowLeft, badge, k), stroke), radius, false),
  ...info(arrowLeft(badge, k, radius)),
]
