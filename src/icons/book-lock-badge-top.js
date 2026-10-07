import { place } from '../clearance'
import { aroundTop, badgeTop } from '../book'
import { cornerScale, lock, outlines } from '../symbols'
import { warning } from '../tone'

// 书 + 右上角锁
const k = cornerScale.lock

export default ({ radius, stroke }) => [
  ...aroundTop(place(outlines.lock, badgeTop, k), radius, stroke),
  ...warning(lock(badgeTop, k, radius)),
]
