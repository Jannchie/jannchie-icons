import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { cornerScale, outlines, plus } from '../symbols'
import { success } from '../tone'

// 文件夹 + 右上角加号
const k = cornerScale.plus

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.plus, badgeTop, k), radius, stroke),
  ...success(plus(badgeTop, k, radius)),
]
