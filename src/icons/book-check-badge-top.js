import { place } from '../clearance'
import { aroundTop, badgeTop } from '../book'
import { check, cornerScale, outlines } from '../symbols'
import { success } from '../tone'

// 书 + 右上角勾
const k = cornerScale.check

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.check, badgeTop, k), radius, stroke),
  ...success(check(badgeTop, k, radius)),
]
