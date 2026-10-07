import { place } from '../clearance'
import { aroundTop, badgeTop } from '../folder'
import { arrowDown, cornerScale, outlines } from '../symbols'
import { info } from '../tone'

// 文件夹 + 右上角下箭头
const k = cornerScale.arrowDown

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.arrowDown, badgeTop, k), radius, stroke),
  ...info(arrowDown(badgeTop, k, radius)),
]
