import { place } from '../clearance'
import { aroundTop, badgeTop } from '../calendar'
import { cornerScale, lock, outlines } from '../symbols'
import { warning } from '../tone'

// 日历 + 右上角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.lock, badgeTop, k), radius, stroke),
  ...warning(lock(badgeTop, k, radius)),
]
