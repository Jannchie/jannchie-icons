import { place } from '../clearance'
import { aroundTop, badgeTop } from '../monitor'
import { cornerScale, outlines, plus } from '../symbols'
import { success } from '../tone'

// 显示器 + 右上角加号
const k = cornerScale.plus

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.plus, badgeTop, k), radius, stroke),
  ...success(plus(badgeTop, k, radius)),
]
