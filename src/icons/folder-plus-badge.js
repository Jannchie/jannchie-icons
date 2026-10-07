import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, plus } from '../symbols'
import { success } from '../tone'

// 文件夹 + 右下角加号
const k = cornerScale.plus

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.plus, badge, k), stroke), radius, false),
  ...success(plus(badge, k, radius)),
]
